let isDisplayAllUsaDates = false;
let isDisplayAllEuropeDates = false;
const usaTour = document.querySelector('.usaTour .dates');
const europeTour = document.querySelector('.europeTour .dates');
const UsaMoreLessDates = document.querySelector('.usaTour .more-less-dates');
const europeMoreLessDates = document.querySelector('.europeTour .more-less-dates');
UsaMoreLessDates.addEventListener('click', () => {
    isDisplayAllUsaDates = !isDisplayAllUsaDates;
    usaTourDisplay();
})
europeMoreLessDates.addEventListener('click', () => {
    isDisplayAllEuropeDates = !isDisplayAllEuropeDates;
    europeTourDisplay();
})

function getDateTour(dates, index) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateTour = new Date(dates[index].date).toLocaleDateString('fr-FR', options).toString().split(" ");
    dateTour = `${dateTour[1]} ${dateTour[2]}`;
    return `<div class="date">
    <h5 class="day-month-year">${dateTour}</h4>
    <h2 class="city">${dates[index].city}</h2>
    <h3 class="place">${dates[index].place}</h3>
    <div class="customButton">
        <div class="wrapper">
            <div class="link_wrapper">
            <a href="${dates[index].link}"><span>RÉSERVER</span></a>
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
                </svg>
            </div>
            </div>
        </div>
    </div>
</div>`;
}

async function usaTourDisplay() {
    let dates;
    let usaDates = [];
    let firebaseDb = await firebase.database().ref();
        firebaseDb.child('dates').on('value', snap => {
            dates = Object.values(snap.val());
            for (let i = 0; i < dates.length; i++) {
                if (dates[i].continentCountry === "USA") {
                    usaDates.push(dates[i]);
                }
            }
            if (isDisplayAllUsaDates === false) {
                usaTour.innerHTML = "";
                for (let i = 0; i < 4; i++) {
                    let date = getDateTour(usaDates, i);
                    usaTour.innerHTML += date;
                }
            }else{
                usaTour.innerHTML = "";
                for (let i = 0; i < usaDates.length; i++) {
                    let date = getDateTour(usaDates, i);
                    usaTour.innerHTML += date;
                }
            }
        })
}
async function europeTourDisplay() {
    let dates;
    let europeDates = [];
    let firebaseDb = await firebase.database().ref();
        firebaseDb.child('dates').on('value', snap => {
            dates = Object.values(snap.val());
            
            for (let i = 0; i < dates.length; i++) {
                if (dates[i].continentCountry === "Europe") {
                    europeDates.push(dates[i]);
                }
            }
            console.log(europeDates)
            if (isDisplayAllEuropeDates === false) {
                europeTour.innerHTML = "";
                for (let i = 0; i < 4; i++) {
                    let date = getDateTour(europeDates, i);
                    europeTour.innerHTML += date;
                }
            }else{
                europeTour.innerHTML = "";
                for (let i = 0; i < europeDates.length; i++) {
                    let date = getDateTour(europeDates, i);
                    europeTour.innerHTML += date;
                }
            }
        })
}
europeTourDisplay();
usaTourDisplay();