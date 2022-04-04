const q = (selector) => document.querySelector(selector);

const addOption = (city) => {
    const optionEl = document.createElement("option");

    
    optionEl.value = `${city.toLowerCase()}`;
    optionEl.textContent = `${city}`;

    q("#city-selector").append(optionEl);
}

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
const cardRight = (main) => {
    const divAllRight = document.createElement("div");
    const divTempTop = document.createElement("div");


    //    CREATING  THE   RIGHT  TOP    SIDE   OF   THE    CARD 
    const temp = document.createElement("h3");
    const feelTemp = document.createElement("p");

    temp.textContent = `${parseInt(main.temp)} °C`;
    feelTemp.textContent = `wind chill ${main.feels_like} °C`;

    divTempTop.append( temp, feelTemp);
    divTempTop.classList.add("temp");

    //    END    OF   CREATING  THE   RIGHT   TOP    SIDE   OF   THE    CARD 


   divAllRight.append(divTempTop, cardRightBottom(main));
   divAllRight.classList.add("right-side");

   return divAllRight;
}
const createCard = (cityObj, icon) => {
    const divAll = document.createElement("div");
    const divLeft = document.createElement("div");
    // const imgCity = document.createElement("img");

    
    const imgWeather = document.createElement("img");
    imgWeather.setAttribute("alt", "weather img");

    cityObj.weather.map((data) => data.main.toLowerCase() == "clouds" ? imgWeather.setAttribute("src", "img/cloud.png") :
    data.main.toLowerCase() == "rain" ? imgWeather.setAttribute("src", "img/cloud+rain.png") : imgWeather.setAttribute("src", "img/sun.png"));

    imgWeather.setAttribute("width", "100px");
    imgWeather.setAttribute("height", "auto");


    // CREATING    THE   LEFT    SIDE   OF   THE    CARD 
    const cityName = document.createElement("h2");

    cityName.textContent = `${cityObj.name}`;

    divLeft.classList.add("left-side");
    divLeft.append(imgWeather, cityName);
    // END    OF   CREATING  THE   LEFT    SIDE   OF   THE    CARD 

    divAll.style.backgroundImage = `url(${icon})`;
    divAll.style.backgroundPosition = "center";
    divAll.style.backgroundSize = "cover";
    divAll.classList.add("card");

    divAll.append( divLeft, cardRight(cityObj.main));

    q("#city-list").append(divAll);
}

//                            END      CARD      CITY


//  set local time
const localTime = (datatime) => {
    const dayData = datatime.split("").slice(0, 10).join("").split("-");
    const timeData = datatime.split("").slice(11, 19).join("").split(":");

    const divDate = document.createElement("div");
    const divTime = document.createElement("div");

    const day = document.createElement("h4");
    const months = document.createElement("h4");
    const year = document.createElement("h4");

    console.log(datatime.split("").slice(11, 19).join("").split(":"));

    day.textContent = `${dayData[2]}/`;
    months.textContent = `${dayData[1]}/`;
    year.textContent = `${dayData[0]}`;

    const hours = document.createElement("h4");
    const minute = document.createElement("h4");
    const seconds = document.createElement("h4");

    hours.textContent = `${timeData[0]}:`;
    minute.textContent = `${timeData[1]}:`;
    seconds.textContent = `${timeData[2]}`;

    divDate.append(day, months, year);
    divDate.classList.add("date");

    divTime.append(hours, minute);
    divTime.classList.add("time");

    q(".time-zone").append(divDate, divTime);
}

const getTimeApi = async () => {
    const res = await 
    fetch(`http://worldtimeapi.org/api/timezone/Europe/Rome`);
    return await res.json();
}

const getApi = async (city) => {
    const res = await 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=602e9e1a06c28fdda7a4dc03a03ca575&units=metric`);
    return await res.json();
}

export { addOption, getApi, createCard, localTime, getTimeApi }