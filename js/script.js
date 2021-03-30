import firebaseConfig from './firebaseConfig.js';
import onToggleLogin from "./login.js";
import {onMouseMove, onMouseClick} from "./cursor.js";
import "./contact.js"
import "./tours.js"
const login = document.querySelector('.login');
if (login) {
   login.addEventListener('click', onToggleLogin); 
}

document.addEventListener('mousemove', onMouseMove)
document.addEventListener('click', onMouseClick)
const videoContainer = document.querySelector('.videos .container');
document.addEventListener('scroll', (event) => {
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
   
})