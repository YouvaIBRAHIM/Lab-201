import { isMailValid, getCurrentHour, getCurrentDate } from "./utils.js";
import "./contact.js";
import "./header.js";

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
const firebaseDb = firebase.database().ref();
const publicationsDiv = document.querySelector(".publications");
const experiencesDiv = document.querySelector(".experiences");
const addToggleExperiece = document.querySelector(".addToggleExperiece a");
const addExperience = document.querySelector(".addExperience");
const addExperienceCloseBtn = document.querySelector(".addExperience .closeBtn");
const addExperienceSubmit = document.querySelector(".addExperience button");

const inputsForm = document.querySelectorAll('.addExperience input');
const textareaForm = document.querySelector('.addExperience textarea');
addToggleExperiece.addEventListener('click', (event) => {
    event.preventDefault();
    addExperience.classList.toggle("expanded");
})

addExperienceCloseBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addExperience.classList.toggle("expanded");
})

function pushData(path, data) {
    let dataToPush = firebaseDb.child(path);
    dataToPush.push(data); 
}
addExperienceSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    const [email, subject, conditions] = inputsForm;
    if (email.value && subject.value && textareaForm.value && conditions.checked == true) {
        if (isMailValid(email.value)) {
            let newExperience = {
                email : email.value.trim(),
                subject : subject.value.trim(),
                text : textareaForm.value.trim(),
                isValidated : false,
                date : getCurrentDate(),
                hour : getCurrentHour()
            }
            pushData('experiences', newExperience);
            Toast.fire({
                icon: 'success',
                title: 'Expérience soumise'
            })
            email.value = ''; 
            subject.value = ''; 
            textareaForm.value = '';
            conditions.checked = false;
            addExperience.style.display = "none";
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Attention',
                text: 'Email invalide',
                
            })
        }
        
    }
})

function experienceGenerator(experiences, index) {
    
    return `
    <div class="experience">
        <img src="../img/Visuels/Visuel home desktop.png" alt="">
        <h2 class="titre">${experiences[index].subject}</h2>
        <h6 class="date">${experiences[index].date}</h6>
        <p class="text">${experiences[index].text}</p>
        <a class="read" href="">
            <span></span>
        </a>
    </div>
    `;
}

async function getExperience() {
    let experiences;
    let firebaseDb = await firebase.database().ref();
        firebaseDb.child('experiences').on('value', snap => {
            experiences = Object.values(snap.val());
            experiencesDiv.innerHTML = "";
            experiences = experiences.filter((exp) =>{
                return exp.isValidated == true;
            })
            
            for (let i = 0; i < experiences.length; i++) {
                let experience = experienceGenerator(experiences, i);
                experiencesDiv.innerHTML += experience;
            }
            toDisplayExperienceText();
        })
}
getExperience()
function articleGenerator(publications, index) {
    let resume = "";
    if (publications[index].resume) {
        resume = publications[index].resume;
    }
    return `
    <div class="publication">
        <img src="${publications[index].img}" alt="">
        <h2 class="titre">${publications[index].title}</h2>
        <h6 class="date">${publications[index].date}</h6>
        <span class="resume">${resume}</span>
        <p class="text">${publications[index].text}</p>
        <a class="read" href="">
            <span></span>
        </a>
    </div>
    `;
}

async function getArticles() {
    let publications;
    let firebaseDb = await firebase.database().ref();
        firebaseDb.child('publications').on('value', snap => {
            publications = Object.values(snap.val());
            publicationsDiv.innerHTML = "";
            for (let i = 0; i < publications.length; i++) {
                let publication = articleGenerator(publications, i);
                publicationsDiv.innerHTML += publication;
            }
            toDisplayText();
        })
}
getArticles();


async function toDisplayText() {
    const readMore = await document.querySelectorAll(".actus .publications .read");
    const publications = await document.querySelectorAll(".actus .publication");

    for (let i = 0; i < readMore.length; i++) {
        await readMore[i].addEventListener('click', (event) => {
            event.preventDefault();
            event.target.classList.toggle('expanded');
            publications[i].querySelector('.text').classList.toggle('expanded');
            //textToDisplay.classList.toggle('expanded');
            console.log(publications[i].querySelector('.text'))
        });
    }
}
async function toDisplayExperienceText() {
    const readMore = await document.querySelectorAll(".actus .experiences .read");
    const experiences = await document.querySelectorAll(".actus .experience");

    for (let i = 0; i < readMore.length; i++) {
        await readMore[i].addEventListener('click', (event) => {
            event.preventDefault();
            event.target.classList.toggle('expanded');
            experiences[i].querySelector('.text').classList.toggle('expanded');
            //textToDisplay.classList.toggle('expanded');
            console.log(experiences[i].querySelector('.text'))
        });
    }
}