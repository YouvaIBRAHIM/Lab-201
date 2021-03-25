import './authentication.js';
import firebaseConfig from './firebaseConfig.js';
let logout = document.querySelector('.logout');
logout.addEventListener('click', onToggleLogout);
function onToggleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut().then(() => {
        console.log('User loggued out');
    });
}
let addAdminForm = document.querySelector('.administrateurs form');
let form = document.querySelector('.displayForm');
let closeBtn = document.querySelector('.closeForm');
function displayForm() {
    form.addEventListener('click', event => {
        console.log('click');
        addAdminForm.className = "d-block";
        form.className = "d-none";
        closeBtn.addEventListener('click', event => {
            event.preventDefault();
            addAdminForm.className = "d-none";
            form.className = "d-block  btn btn-dark";
        })
    })
}

displayForm();