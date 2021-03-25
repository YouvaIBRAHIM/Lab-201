import firebaseConfig from './firebaseConfig.js';
import onToggleLogin from "./login.js";
import {onMouseMove, onMouseClick} from "./cursor.js";

const login = document.querySelector('.login');
if (login) {
   login.addEventListener('click', onToggleLogin); 
}

document.addEventListener('mousemove', onMouseMove)
document.addEventListener('click', onMouseClick)