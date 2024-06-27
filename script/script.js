var typedInput = document.querySelectorAll('input')[0]

// card 1
var card1 = document.querySelector('.card1')
var displayedDay
var displayedNumber
var displayedCity
var displayedDegree
var displayedIcon = 'ICON'
var displayedStatus
var displayedPercentage
var displayedWind
var displayedDirection

// card 2
var card2 = document.querySelector('.card2')
var displayedDay2
var displayedIcon2 = '2ICON2'
var displayedDegree2
var displayedDegreeLower2
var displayedStatus2

// card 3
var card3 = document.querySelector('.card3')
var displayedDay3
var displayedIcon3 = '3ICON3'
var displayedDegree3
var displayedDegreeLower3
var displayedStatus3


typedInput.addEventListener('input', function(){
    let cityInput = typedInput.value
    fetchData(cityInput);
})

async function fetchData(cityInput) {
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a814eb59ccb34049949202154242306&q=${cityInput}&days=3`)

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let data = await response.json();

        var today = new Date(data.forecast.forecastday[0].date)
        var tomorrow = new Date(data.forecast.forecastday[1].date)
        var afterTomorrow = new Date(data.forecast.forecastday[2].date)
        let options = { weekday: 'long' };
        
        // card 1
        displayedDay = today.toLocaleDateString('en-US', options);
        displayedNumber = today.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
        displayedCity = data.location.name
        displayedDegree = data.current.temp_c;
        displayedStatus = data.current.condition.text
        displayedPercentage = data.forecast.forecastday[0].day.daily_chance_of_rain;
        displayedWind = data.current.wind_kph;
        displayedDirection = data.current.wind_dir;

        // card 2
        displayedDay2 = tomorrow.toLocaleDateString('en-US', options);
        displayedDegree2 = data.forecast.forecastday[1].day.maxtemp_c;
        displayedDegreeLower2 = data.forecast.forecastday[1].day.mintemp_c;
        displayedStatus2 = data.forecast.forecastday[1].day.condition.text;

        //card 3
        displayedDay3 = afterTomorrow.toLocaleDateString('en-US', options);
        displayedDegree3 = data.forecast.forecastday[2].day.maxtemp_c;
        displayedDegreeLower3 = data.forecast.forecastday[2].day.mintemp_c;
        displayedStatus3 = data.forecast.forecastday[2].day.condition.text;


        updateCard1(displayedDay, displayedNumber, displayedCity, displayedDegree, displayedIcon, displayedStatus, displayedPercentage, displayedWind, displayedDirection);
        updateCard2(displayedDay2, displayedIcon2, displayedDegree2, displayedDegreeLower2, displayedStatus2);
        updateCard3(displayedDay3, displayedIcon3, displayedDegree3, displayedDegreeLower3, displayedStatus3);

        return data;

    }
    catch (error) {
        console.error('This has been an error!', error)
    }
}

function updateCard1(day, number, city, degree, icon, status, percentage, wind, direction) {
    card1.innerHTML = `<!-- card header -->
                        <div class="text-white-50 py-2 rounded-left-top bg-clr3">
    
                            <span class="d-flex justify-content-between align-items-center">
                                <p class="m-0 ms-2">${day}</p>
                                <p class="m-0 me-2">${number}</p>
                            </span>
    
                        </div>
    
                        <!-- card content -->
                        <div class="bg-clr5 rounded-left-bottom py-4 flex-grow-1 d-flex flex-column">
    
                            <h5 class="ms-3 text-white-50 p-3">${city}</h5>
                            <h1 class="ms-3 text-white display-1 fw-bolder">${degree}°C</h1>
    
                            <div class="ms-4 py-1">
                                ${icon}
                            </div>
    
                            <p class="clr ms-3">${status}</p>
    
                            <div class="d-flex justify-content-start align-items-center ms-3 pb-2 mt-auto">
    
                                <div class="d-flex justify-content-center align-items-center me-3">
                                    <img src="./images/icon-umberella.png" alt="">
                                    <p class="m-0 text-white-50 ms-1">${percentage}%</p>
                                </div>
    
                                <div class="d-flex justify-content-center align-items-center">
                                    <img src="./images/icon-wind.png" alt="">
                                    <p class="m-0 text-white-50 ms-1">${wind} Km/h</p>
                                </div>
    
                                <div class="d-flex justify-content-center align-items-center ms-3">
                                    <img src="./images/icon-compass.png" alt="">
                                    <p class="m-0 text-white-50 ms-1">${direction}</p>
                                </div>
    
                            </div>
                        </div>
    `
}

function updateCard2(day, icon, degree, degreeLower, status) {
    card2.innerHTML = `<!-- card header -->
                            <div class="text-white-50 py-2 bg-clr4">
                                <p class="m-0 text-center">${day}</p>
                            </div>
        
                            <!-- card content -->
                            <div class="bg-clr2 py-5 flex-grow-1 d-flex flex-column">
        
                                <div class="text-center py-4">
                                    ${icon}
                                </div>
        
                                <h4 class="ms-3 text-center text-white fw-bold pt2-5">${degree}°C</h4>
                                <h6 class="ms-3 text-center text-white-50 fw-light">${degreeLower}°</h6>
                                <p class="clr ms-3 text-center fw-normal mt-auto">${status}</p>
        
                            </div>
   `
}

function updateCard3(day, icon, degree, degreeLower, status) {
    card3.innerHTML = `<!-- card header -->
                        <div class="text-white-50 py-2 rounded-right-top bg-clr3">
                            <p class="m-0 text-center">${day}</p>
                        </div>
    
                        <!-- card content -->
                        <div class="bg-clr5 rounded-right-bottom py-5 flex-grow-1 d-flex flex-column">
    
                            <div class="text-center py-4">
                                ${icon}
                            </div>
    
                            <h4 class="ms-3 text-center text-white fw-bold pt2-5">${degree}</h4>
                            <h6 class="ms-3 text-center text-white-50 fw-light">${degreeLower}</h6>
                            <p class="clr ms-3 text-center fw-normal mt-auto">${status}</p>
    
                        </div>
    `
}