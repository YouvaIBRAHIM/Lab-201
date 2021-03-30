
import {onMouseMove, onMouseClick} from "./cursor.js";

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
document.addEventListener('mousemove', onMouseMove)
document.addEventListener('click', onMouseClick)

submitBtn.addEventListener('click', onToggleSubmit)

function pushData(path, data) {
    let dataToPush = firebaseDb.child(path);
    dataToPush.push(data); 
}
contactBtn.addEventListener('click', (event) => {
    event.preventDefault();
    contact.style.display = "flex";
})
closeContactBtn.addEventListener('click', (event) => {
    contact.style.display = "none";
})
function getCurrentDate() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = '0' + (date.getMonth()+1);
    const day = '0' + date.getDate();
    const currentDate = day.substr(-2) + '/' + month.substr(-2) + '/' + year;
    return currentDate;
}
function getCurrentHour() {
    const date = new Date();
    const hour = '0' + date.getHours()
    const minute = '0' + date.getMinutes();
    const currentHour = hour.substr(-2) + ':' + minute.substr(-2);
    return currentHour;
}


            
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
                pushData('messages', newMessage);
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


 function isMailValid(email){
	if(email.length < 8 || email.length > 30) return false;
	if(email.indexOf("@") < 2) return false;
	if(email.split('@').length > 2) return false;
	return true;	
}

function isNameValid(name){
	if(name.length < 2 || name.length > 20) return false;
	if(name.indexOf('*') > -1 || name.indexOf('$') > -1 
	|| name.indexOf('&') > -1 || name.indexOf('#') > -1 
	|| name.indexOf("\\") > -1 || name.indexOf('@') > -1 ){
	return false;
	}
	return true;	
}


