
const usaTour = document.querySelector('.usaTour .dates');
const usa = document.querySelector('.usaTour .usa');
const usaAfter = document.querySelector(".tours .usaTour .usa div");

const europeTour = document.querySelector('.europeTour .dates');
const europe = document.querySelector('.europeTour .europe');
const europeAfter = document.querySelector(".tours .europeTour .europe div");
const UsaMoreLessDates = document.querySelector(' .more-less-dates-for-usa');
const europeMoreLessDates = document.querySelector(' .more-less-dates-for-europe');


usa.addEventListener('click', () => {
    usaTour.classList.toggle('expanded');
    usa.classList.toggle('expanded');
    usaAfter.classList.toggle('expanded');
})
europe.addEventListener('click', () => {
    europeTour.classList.toggle('expanded');
    europe.classList.toggle('expanded');
    europeAfter.classList.toggle('expanded');
})

function getDateTour(dates, index) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateTour = new Date(dates[index].date).toLocaleDateString('fr-FR', options).toString().split(" ");
    dateTour = `${dateTour[1]} ${dateTour[2]}`;
    let policeColor = "";
    let isAvailable = dates[index].isAvailable;
    let btnToDisplay = "";
    if (isAvailable === true) {
        policeColor = "black";
        btnToDisplay = `<div class="customButton">
                            <div class="wrapper">
                                <div class="link_wrapper">
                                <a href="${dates[index].link}" target="_blank"><span>RÉSERVER</span></a>
                                <div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                                    <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
                                    </svg>
                                </div>
                                </div>
                            </div>
                        </div>`;
    }else{
        policeColor = "grey";
        btnToDisplay = `<div class="soldOut">
                            <span>COMPLET</span>
                        </div>`;
    }

    return `<div style="color:${policeColor};" class="date">
    <h5 class="day-month-year">${dateTour}</h4>
    <h2 class="city">${dates[index].city}, ${dates[index].country}</h2>
    <h3 class="place">${dates[index].place}</h3>
    ${btnToDisplay}
    
    
    
</div>`;
}


async function usaTourDisplay() {
    let dates;
    let usaDates = [];
    let firebaseDb = await firebase.database().ref();
        firebaseDb.child('dates').on('value', snap => {
            dates = Object.values(snap.val());
            dates.sort((a, b) => {
                if ( a.date < b.date ){
                    return -1;
                  }
                  if ( a.date > b.date ){
                    return 1;
                  }
                  return 0;
            })

            for (let i = 0; i < dates.length; i++) {
                if (dates[i].continent === "USA") {
                    usaDates.push(dates[i]);
                }
            }
            if (usaDates.length > 4) {
                UsaMoreLessDates.addEventListener('click', () => {
                    usaTour.classList.toggle('expanded');
                    UsaMoreLessDates.classList.toggle('expanded');
                })
            }
            usaTour.innerHTML = "";
            for (let i = 0; i < usaDates.length; i++) {
                let date = getDateTour(usaDates, i);
                usaTour.innerHTML += date;
            }

        })
}
async function europeTourDisplay() {
    let dates;
    let europeDates = [];
    let firebaseDb = await firebase.database().ref();
        firebaseDb.child('dates').on('value', snap => {
            dates = Object.values(snap.val());
            dates.sort((a, b) => {
                if ( a.date < b.date ){
                    return -1;
                  }
                  if ( a.date > b.date ){
                    return 1;
                  }
                  return 0;
            })
            for (let i = 0; i < dates.length; i++) {
                if (dates[i].continent === "Europe") {
                    europeDates.push(dates[i]);
                }
            }
            if (europeDates.length > 4) {
                europeMoreLessDates.addEventListener('click', () => {
                    europeTour.classList.toggle('expanded');
                    europeMoreLessDates.classList.toggle('expanded');
                })
            }
            europeTour.innerHTML = "";
            for (let i = 0; i < europeDates.length; i++) {
                let date = getDateTour(europeDates, i);
                europeTour.innerHTML += date;
            }
        })
}
europeTourDisplay();
usaTourDisplay();