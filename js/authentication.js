import firebaseConfig from './firebaseConfig.js';
import '../node_modules/firebase/firebase-storage.js';

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        let userName = document.querySelector('.user span');
        let userImg = document.querySelector('.user img');
        userName.innerHTML = user.displayName;
        userImg.src = user.photoURL
    } else {
        
        
    }
});




