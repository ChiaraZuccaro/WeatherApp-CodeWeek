import { q } from "./addingCity.js";


const addOption = (city) => {
    const optionEl = document.createElement("option");

    optionEl.classList.add("opt");

    optionEl.value = `${city.toLowerCase()}`;
    optionEl.textContent = `${city}`;

    q("#city-selector").append(optionEl);
}




//               TO    FILTER     CITY
const removeCard = () => { 
    const cardEl = document.querySelectorAll(".card");

    try {
        cardEl.forEach((card) => q(".city-list").removeChild(card));
    } catch {
        cardEl.forEach((card) => q(".saved-city").removeChild(card));
    }

}
const selectCity = (card) => {
    removeCard();

    q(".saved-city").append(card);
}
//            END   TO   FILTER    CITY







//                                 CARD      CITY

//   create the right-bottom side of the card
const cardRightBottom = (main) => {
    const divBottomRight = document.createElement("div");

    const min = document.createElement("h6");
    const minValue = document.createElement("p");
    const max = document.createElement("h6");
    const maxValue = document.createElement("p");
    const hum = document.createElement("h6");
    const humValue = document.createElement("p");
    
    const divMin = document.createElement("div");    
    const divMax = document.createElement("div");
    const divHum = document.createElement("div");

    divMin.classList.add("min-max");
    divMax.classList.add("min-max");
    divHum.classList.add("min-max");

    min.textContent = "MIN";
    minValue.textContent = `${parseInt(main.temp_min)} °C`;
    divMin.append(min, minValue);

    max.textContent = "MAX";
    maxValue.textContent = `${parseInt(main.temp_max)} °C`;
    divMax.append(max, maxValue);

    hum.textContent = "HUMIDITY";
    humValue.textContent = `${main.humidity} %`;
    divHum.append(hum, humValue);

    divBottomRight.append( divMax, divMin, divHum);
    divBottomRight.classList.add("bottom-card");

    return divBottomRight;
}
//  create the right side of the card
const cardRight = (main, city) => {
    const divAllRight = document.createElement("div");
    const divTop = document.createElement("div");
    const divStarTemp = document.createElement("div");

    const imgSave = document.createElement("img");

    imgSave.classList.add("hidden");

    imgSave.id = "star";
    imgSave.src = "img/star.png";
    imgSave.alt = "save icon";
    imgSave.setAttribute("width","24px");
    imgSave.setAttribute("height", "24px");

    if(city.saves == "yes"){
        imgSave.classList.remove("hidden");
    }

    //    CREATING  THE   RIGHT  TOP    SIDE   OF   THE    CARD 
    const temp = document.createElement("h3");
    const feelTemp = document.createElement("p");

    temp.textContent = `${parseInt(main.temp)} °C`;
    feelTemp.textContent = `wind chill ${main.feels_like} °C`;

    divStarTemp.classList.add("temp-star");
    divStarTemp.append(temp, imgSave);

    divTop.append( divStarTemp, feelTemp);
    divTop.classList.add("temp");

    //    END    OF   CREATING  THE   RIGHT   TOP    SIDE   OF   THE    CARD 


   divAllRight.append(divTop, cardRightBottom(main));
   divAllRight.classList.add("right-side");

   return divAllRight;
}
const createCard = (cityObj, city) => {
    const divWrap = document.createElement("div");
    const divAll = document.createElement("div");
    const divLeft = document.createElement("div");
    const divLayout = document.createElement("div");
    
    const imgWeather = document.createElement("img");
    imgWeather.setAttribute("alt", "weather img");

    cityObj.weather.map((data) => data.main.toLowerCase() == "clouds" ? imgWeather.setAttribute("src", "img/cloud.png") :
    data.main.toLowerCase() == "rain" ? imgWeather.setAttribute("src", "img/cloud+rain.png") : imgWeather.setAttribute("src", "img/sun.png"));

    imgWeather.setAttribute("width", "120px");
    imgWeather.setAttribute("height", "auto");


    // CREATING    THE   LEFT    SIDE   OF   THE    CARD 
    const cityName = document.createElement("h2");

    cityName.textContent = `${cityObj.name}`;

    divLeft.classList.add("left-side");
    divLeft.append(imgWeather, cityName);
    // END    OF   CREATING  THE   LEFT    SIDE   OF   THE    CARD 

    divWrap.style.backgroundImage = `url(${city.icon})`;
    divWrap.style.backgroundPosition = "center";
    divWrap.style.backgroundSize = "cover";

    divLayout.classList.add("overlay");

    divWrap.classList.add("card");

    divAll.classList.add("all-info");

    divAll.append( divLeft, cardRight(cityObj.main, city));
    divWrap.append(divLayout, divAll);

    if(city.saves == "yes") {
        q(".saved-city").append(divWrap);
    } else
    q(".city-list").append(divWrap);
}
//                            END      CARD      CITY






//  set local time
const timeDisplay = document.getElementById("time-zone");

const numberToMonths = (number) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    for(let i = 0; i < months.length; i++) {
        if((number  - 1) == i) {
            return months[i];            
        }
    }
}
const localTime = (datatime) => {
    timeDisplay.innerHTML = "";
    const dayData = datatime[0];
    const timeData = datatime[1];

    const divDate = document.createElement("div");
    const divTime = document.createElement("div");
    const all = document.createElement("div");

    const day = document.createElement("h4");
    const months = document.createElement("h4");
    const year = document.createElement("h4");

    day.textContent = `${dayData.split("/")[1]}`;
    months.textContent = `${numberToMonths(dayData.split("/")[0])} `;
    year.textContent = `${dayData.split("/")[2]}`;

    const hours = document.createElement("h4");
    const minute = document.createElement("h4");
    const seconds = document.createElement("h4");

    hours.textContent = `${timeData.split(":")[0]}:`;
    minute.textContent = `${timeData.split(":")[1]}:`;
    seconds.textContent = `${timeData.split(":")[2]}`;

    divDate.append(day, months, year);
    divDate.classList.add("date");

    divTime.append(hours, minute, seconds);
    divTime.classList.add("time");

    all.classList.add("all-time");

    all.append(divDate, divTime)
    timeDisplay.append(all);
}
function refreshTime() {
    let dateString = new Date().toLocaleString("en-US", {timeZone: "Europe/Rome"});
    
    localTime(dateString.split(", "));
}
setInterval(refreshTime, 1000);
//   end local time





const getApi = async (cityList) => {
    let dataList = [];
    for(let i = 0; i < cityList.length; i++) {
        const res = await 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].city}&appid=602e9e1a06c28fdda7a4dc03a03ca575&units=metric`);
        const data = await res.json();
        dataList.push(data);
    }

    return dataList;
}

export { addOption, getApi, createCard, selectCity, removeCard }