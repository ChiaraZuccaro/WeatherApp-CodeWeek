import { getApi } from "./function.js";

const q = (selector) => document.querySelector(selector);

const cityListHome = [
    {
        city: "Catania",
        icon: "features/liotru.jpg",
        saves: "yes"
    }, 
    { 
        city: "Enna",
        icon: "features/rocca-cerere.jpg",
        saves: "no"
    }, 
    {
        city: "Caltanissetta",
        icon: "features/fontana-tritone.jpg",
        saves: "no"
    },
    {
        city: "Syracuse",
        icon: "features/dionisio.jpg",
        saves: "no"
    },
    {
        city: "Ragusa",
        icon: "features/castello-di-donnafugata.jpg",
        saves: "no"
    },
    {
        city: "Agrigento",
        icon: "features/concordia.jpg",
        saves: "no"
    },
    {
        city: "Messina",
        icon: "features/catalani.jpg",
        saves: "no"
    },
    {
        city: "Trapani",
        icon: "features/Castello-della-Colombaia.jpg",
        saves: "no"
    },
    {
        city: "Palermo",
        icon: "features/vergogna.jpg",
        saves: "yes"
    } 
];
let cityListStorage;
let cityListComplete;


//     LocalStorage check
try {
    cityListStorage = JSON.parse(localStorage.getItem("cities").split(","));
    cityListComplete = cityListStorage;
} catch {
    cityListComplete = cityListHome;
}

function fieldResetSaves() {
    let ele = document.getElementsByName("saves");

    for(let i=0; i < ele.length; i++) {        
        ele[i].checked = false;
    }
}




const zoomDown = (data) => {    
    const divBottom = document.createElement("div");

    const divRight = document.createElement("div");
    const divLeft = document.createElement("div");

    const divTempGif = document.createElement("div");
    const divMinMax = document.createElement("div");



    //             MIN    MAX

    const divMin = document.createElement("div");
    const divMax = document.createElement("div");
    const divHum = document.createElement("div");
    const min = document.createElement("h6");
    const max = document.createElement("h6");
    const hum = document.createElement("h6");
    const minValue = document.createElement("p");
    const maxValue = document.createElement("p");
    const humValue = document.createElement("p");

    min.textContent = "MIN";
    max.textContent = "MAX";
    hum.textContent = "HUMIDITY";

    minValue.textContent = `${parseInt(data.main.temp_min)} °C`;
    maxValue.textContent = `${parseInt(data.main.temp_max)} °C`;
    humValue.textContent = `${parseInt(data.main.humidity)} %`;

    divMin.classList.add("only-zoom");
    divMax.classList.add("only-zoom");
    divHum.classList.add("only-zoom");

    divMin.append(min, minValue);
    divMax.append(max, maxValue);
    divHum.append(hum, humValue);

    divMinMax.classList.add("minmax-zoom");
    divMinMax.append( divMin, divMax, divHum);

    //            END   MIN    MAX




    const imgWeather = document.createElement("img");
    const descWeather = document.createElement("p");
    const suggestWeather = document.createElement("p");

    data.weather.map((data) => {
        if(data.main.toLowerCase() == "clouds") {
            imgWeather.setAttribute("src", "img/cloud.png");
        } else if(data.main.toLowerCase() == "rain") {
            imgWeather.setAttribute("src", "img/cloud+rain.png");
        } else {            
            imgWeather.setAttribute("src", "img/sun.png");
        }

                        
        descWeather.textContent = `${data.description}`;
    });

    imgWeather.setAttribute("alt", "weather icon");
    imgWeather.setAttribute("width", "150px");
    imgWeather.setAttribute("height", "auto");


    //     TEMPERATURE + GIF
    const temp = document.createElement("h3");
    const gif = document.createElement("img"); //optional

    gif.classList.add("hidden");

    temp.textContent = `${parseInt(data.main.temp)} °C`;
    
    divTempGif.classList.add("gif-temp");
    divTempGif.append( gif, temp);

    //    END  TEMPERATURE + GIF





    divLeft.classList.add("left-zoom");
    divLeft.append( imgWeather, descWeather, suggestWeather);
    

    divRight.classList.add("right-zoom");
    divRight.append( divTempGif, divMinMax);

    divBottom.classList.add("bottom-zoom");
    divBottom.append( divLeft, divRight);

    return divBottom;
}
const zoomTop = (cityObj, listEl) => {
    const divTop = document.createElement("div");
    const divCitry = document.createElement("div");
    const divSavDrop = document.createElement("div");  // optional    

    const cityName = document.createElement("h1");
    const country =document.createElement("p");

    cityName.textContent = `${cityObj.name}`;
    country.textContent = `${cityObj.sys.country}`;

    const imgSave = document.createElement("img");
    const imgDrop = document.createElement("img"); // optional

    imgDrop.classList.add("drop");

    imgDrop.src = "img/menu.png";
    imgDrop.alt = "drop icon";
    imgDrop.setAttribute("width","32px");
    imgDrop.setAttribute("height", "32px");

    imgSave.classList.add("hidden");

    imgSave.id = "star";
    imgSave.src = "img/star.png";
    imgSave.alt = "save icon";
    imgSave.setAttribute("width","24px");
    imgSave.setAttribute("height", "24px");

    if(listEl.saves == "yes"){
        imgSave.classList.remove("hidden");
    }

    divCitry.classList.add("city-zoom");
    divCitry.append( cityName, country);

    divSavDrop.classList.add("save-zoom");
    divSavDrop.append(imgDrop,imgSave);

    divTop.style.backgroundImage = `url(${listEl.icon})`;
    divTop.style.backgroundPosition = 'center';
    divTop.style.backgroundSize = 'cover';

    divTop.classList.add("top-zoom");
    divTop.append(divCitry, divSavDrop);

    return divTop;
}
const zoomedCard = (data, listEl) => {
    const divAll = document.createElement("div");

    divAll.classList.add("zoomed-card");
    divAll.append( zoomTop(data, listEl), zoomDown(data));

    q(".zoomed").append(divAll);
}

const zoomCity = (card, data) => {
   const cityName = card.querySelector("h2").outerHTML.split("<h2>").splice(1, 2).join("").split("</h2>").splice(0,1).join("");

   for(let i = 0; i < data.length; i++) {
        if(data[i].name.toLowerCase() == cityName.toLowerCase()){
            zoomedCard(data[i], cityListComplete[i]);
        }
    }

   
   q(".overlay-zoom").addEventListener("click", () => {
       q(".zoomed").removeChild(q(".zoomed-card"));
       q(".overlay-zoom").classList.add("hidden");
   });
}

export { q, cityListComplete, fieldResetSaves, zoomCity}