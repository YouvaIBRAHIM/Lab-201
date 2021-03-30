let isDisplayAllUsaDates = false;
const usaTour = document.querySelector('.usaTour .dates');
const moreLessDates = document.querySelector('.usaTour .more-less-dates');
moreLessDates.addEventListener('click', () => {
    isDisplayAllUsaDates = !isDisplayAllUsaDates;
    usaTourDisplay();
})

function getDateTour() {
    return `<div class="date">
    <h5 class="day-month-year">5 Jan 2022</h4>
    <h2 class="city">Chicago, EU</h2>
    <h3 class="place">Stadium De Vinci</h3>
    <div class="customButton">
        <div class="wrapper">
            <div class="link_wrapper">
            <a href="#"><span>RÉSERVER</span></a>
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

function usaTourDisplay() {
    if (isDisplayAllUsaDates === false) {
        usaTour.innerHTML = "";
        for (let i = 0; i < 4; i++) {
            let date = getDateTour();
            usaTour.innerHTML += date;
        }
    }else{
        usaTour.innerHTML = "";
        for (let i = 0; i < 8; i++) {
            let date = getDateTour();
            usaTour.innerHTML += date;
        }
    }
    
}
usaTourDisplay();