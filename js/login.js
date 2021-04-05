import "./contact.js"
import "./header.js";
const login = document.querySelector('.login');
if (login) {
    login.addEventListener('click', onToggleLogin); 
}

async function onToggleLogin(event) {
    
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then(async result => {
        let admins;
        let firebaseDb = await firebase.database().ref();
        firebaseDb.child('admins').on('value', snap => {
            admins = snap.val();
            let connectedUser = [];
            for (const key in admins) {
                if (admins[key].email === result.user.email) {
                    connectedUser.push(result.user.email);
                    window.location.href = "./dash/index.html";
                }   
            }
            if (connectedUser.length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oulah !',
                        text: "Vous n'êtes pas enregistré en tant qu'administrateur",
                        
                    })
                    firebase.auth().signOut();
                }
        })
        
        
    });
}
export default onToggleLogin;