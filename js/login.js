import firebaseConfig from './firebaseConfig.js';

firebase.initializeApp(firebaseConfig);
async function onToggleLogin(event) {
    
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then(async result => {
        console.log(result);
        let admins;
        let firebaseDb = await firebase.database().ref();
        firebaseDb.child('admins').on('value', snap => {
            admins = snap.val();
            for (const key in admins) {
                if (admins[key].email === result.user.email) {
                    window.location.href = "./dash/index.html";
                }else{
                    alert("n'etes pas un administrateur du site")
                    window.location.href = "../index.html";
                }
                
            }
        })
        
        
    });
}
export default onToggleLogin;