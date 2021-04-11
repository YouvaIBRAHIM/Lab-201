import firebaseConfig from './firebaseConfig.js';
import { isNameValid, isMailValid, getCurrentHour, getCurrentDate, pushData } from "./utils.js";
firebase.initializeApp(firebaseConfig);
const firebaseDb = firebase.database().ref();
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
const contactBtn = document.querySelector('.contactBtn');
const closeContactBtn = document.querySelector('.closeBtn');
const contact = document.querySelector('.contact');
const inputsForm = document.querySelectorAll('.contact input');
const textareaForm = document.querySelector('.contact textarea');
const submitBtn = document.querySelector('.contact button');


submitBtn.addEventListener('click', onToggleSubmit)


contactBtn.addEventListener('click', (event) => {
    event.preventDefault();
    contact.style.display = "flex";
})
closeContactBtn.addEventListener('click', (event) => {
    contact.style.display = "none";
})



            
function onToggleSubmit(event) {
    event.preventDefault();
    const [name, email, subject, conditions] = inputsForm;
    
    if (name.value && email.value && subject.value && textareaForm.value && conditions.checked == true) {
        if (isMailValid(email.value) == true) {
            if (isNameValid(name.value) == true) {
                let newMessage = {
                    name : name.value.trim(), 
                    email : email.value.trim(), 
                    subject : subject.value.trim(), 
                    message : textareaForm.value.trim(),
                    date : getCurrentDate(),
                    hour : getCurrentHour()
                }
                pushData('messages', newMessage, firebaseDb);
                Toast.fire({
                    icon: 'success',
                    title: 'Message envoyé'
                })
                name.value = ''; 
                email.value = ''; 
                subject.value = ''; 
                textareaForm.value = '';
                conditions.checked = false;
                contact.style.display = "none";
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Attention',
                    text: 'Nom invalide',
                    
                  })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Attention',
                text: 'Email invalide',
                
              })
        }
        
        
    }
    

}





