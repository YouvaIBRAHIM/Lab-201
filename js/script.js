import firebaseConfig from './firebaseConfig.js';
import onToggleLogin from "./login.js";
import {onMouseMove, onMouseClick} from "./cursor.js";
import "./contact.js";
import "./tours.js";

const login = document.querySelector('.login');
if (login) {
   login.addEventListener('click', onToggleLogin); 
}
const menuToggle = document.querySelector('.menuToggle');
const nav = document.querySelector('header nav');
const navContainer = document.querySelector('header .contain');
const mainBody = document.querySelector('main');
const navBarLi = document.querySelectorAll('header .contain nav .nav-bar li');
const shopBtn = document.querySelector('.shop');
let isBurgerMenuDisplayed = false;
function onToggleMenu() {
   menuToggle.classList.toggle('expanded');
   navContainer.classList.toggle('expanded');
   nav.classList.toggle('expanded');
   for (let i = 0; i < navBarLi.length; i++) {
      navBarLi[i].classList.toggle('expanded');
   }
   shopBtn.classList.toggle('expanded');
}
menuToggle.addEventListener('click', (event) => {
   isBurgerMenuDisplayed = !isBurgerMenuDisplayed;
   onToggleMenu();
})
mainBody.addEventListener('click', (event) => {
   if (isBurgerMenuDisplayed === true) {
      onToggleMenu();
      isBurgerMenuDisplayed = !isBurgerMenuDisplayed;
   }
   
})
document.addEventListener('mousemove', onMouseMove)
document.addEventListener('click', onMouseClick)
const videoContainer = document.querySelector('.videos .container');

document.addEventListener('scroll', (event) => {
   if (window.innerWidth >= 550) {
      if (scrollY <= 650) {
      videoContainer.style.top = '650px';
      videoContainer.style.transform = "scale(0.6)";
      }
      if (scrollY <= 936 && scrollY >= 650) {
         videoContainer.style.position = 'absolute';
         videoContainer.style.top = (scrollY + 150)+ 'px';
         videoContainer.style.transform = "scale(1)";
      }
      if (scrollY >= 936) {
         videoContainer.style.top = 'auto';
         videoContainer.style.position = 'relative';
      }
   }
   
   
})