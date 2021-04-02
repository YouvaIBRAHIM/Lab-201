import firebaseConfig from './firebaseConfig.js';
import onToggleLogin from "./login.js";
import "./contact.js";
import "./tours.js";
import "./header.js"


const videoContainer = document.querySelector('.videos .container');

document.addEventListener('scroll', (event) => {
   if (window.innerWidth >= 550) {
      if (scrollY <= 600) {
      videoContainer.style.top = '600px';
      videoContainer.style.marginTop = '0';
      videoContainer.style.transform = "scale(0.6)";
      }
      if (scrollY <= 936 && scrollY >= 600) {
         videoContainer.style.position = 'absolute';
         videoContainer.style.marginTop = '20px';
         videoContainer.style.top = (scrollY + 100)+ 'px';
         videoContainer.style.transform = "scale(1)";
      }
      if (scrollY >= 936) {
         videoContainer.style.top = 'auto';
         videoContainer.style.position = 'relative';
      }
   }
   
   
})