import firebaseConfig from './firebaseConfig.js';
import onToggleLogin from "./login.js";
import "./contact.js"
import "./header.js";

const login = document.querySelector('.login');
login.addEventListener('click', onToggleLogin); 