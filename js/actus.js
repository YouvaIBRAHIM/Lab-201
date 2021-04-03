
import "./contact.js";
import "./header.js";


const publicationsDiv = document.querySelector(".publications");
function articleGenerator(publications, index) {
    let resume = "";
    if (publications[index].resume) {
        resume = publications[index].resume;
    }
    return `
    <div class="publication">
        <img src="${publications[index].img}" alt="">
        <h2 class="titre">${publications[index].title}</h2>
        <h6 class="date">${publications[index].date}</h6>
        <span class="resume">${resume}</span>
        <p class="text">${publications[index].text}</p>
        <a class="read" href="">
            <span></span>
        </a>
    </div>
    `;
}

async function getArticles() {
    let publications;
    let firebaseDb = await firebase.database().ref();
        firebaseDb.child('publications').on('value', snap => {
            publications = Object.values(snap.val());
            publicationsDiv.innerHTML = "";
            for (let i = 0; i < publications.length; i++) {
                let publication = articleGenerator(publications, i);
                publicationsDiv.innerHTML += publication;
            }
            toDisplayText();
        })
}
getArticles();


async function toDisplayText() {
    const readMore = await document.querySelectorAll(".actus .read");
    const publications = await document.querySelectorAll(".actus .publication");
    console.log(readMore);

    for (let i = 0; i < readMore.length; i++) {
        await readMore[i].addEventListener('click', (event) => {
            event.preventDefault();
            event.target.classList.toggle('expanded');
            publications[i].querySelector('.text').classList.toggle('expanded');
            //textToDisplay.classList.toggle('expanded');
            console.log(publications[i].querySelector('.text'))
        });
    }
}