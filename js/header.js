import {onMouseMove, onMouseClick} from "./cursor.js";

const menuToggle = document.querySelector('.menuToggle');
const nav = document.querySelector('header nav');
const navContainer = document.querySelector('header .contain');
const mainBody = document.querySelector('main');
const navBarLi = document.querySelectorAll('header .contain nav .nav-bar li');
const navBarLink = document.querySelectorAll('header .contain nav .nav-bar li a');
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
for (let i = 0; i < navBarLink.length; i++) {
   navBarLink[i].addEventListener('click', (event) => {
      isBurgerMenuDisplayed = !isBurgerMenuDisplayed;
      onToggleMenu();
   
})
   
}
document.addEventListener('mousemove', onMouseMove)
document.addEventListener('click', onMouseClick)