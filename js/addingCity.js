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
    },
    {
        city: "Jizan",
        icon: "https://inspiration.rehlat.com/wp-content/uploads/2018/11/Jizan.jpg",
        saves: "yes"
    },
    {
        city: "Oymyakon",
        icon: "https://siviaggia.it/wp-content/uploads/sites/2/2016/10/04_oymyakon-renna_visityakutia-com_1217.jpg",
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



const deleteCity = (card) => {
    const cityDel = card.querySelector("h2").outerHTML.split("<h2>")
    .splice(1, 2).join("").split("</h2>").splice(0,1).join("").toLowerCase();

    console.log(cityDel);

    const newArray = cityListComplete.filter((element) => cityDel.toLowerCase().includes(element.city.toLowerCase()) !== true);

    return newArray;
}

const changeSave = (card) => {    
    const cityDel = card.querySelector("h2").outerHTML.split("<h2>")
    .splice(1, 2).join("").split("</h2>").splice(0,1).join("").toLowerCase();


    for(let i = 0; i < cityListComplete.length; i++){
        if(cityDel.toLowerCase().includes(cityListComplete[i].city.toLowerCase())){
            if(cityListComplete[i].saves == "yes"){
                alert("This city is already in saves!");
                const ans = prompt("Do you want to remove it from saves? y/n");
                if (ans == "y"){
                    cityListComplete[i].saves = "no";
                } else if (ans == "n") {
                    alert("Nothing has changed");
                } else {
                    alert("Something went wrong");
                }
            }
            else {                
                cityListComplete[i].saves = "yes";
            }
        }  
    }
}



const zoomMinMax = (data) => {
    const divMinMax = document.createElement("div");

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

    return divMinMax;
}
const zoomDown = (data) => {    
    const divBottom = document.createElement("div");

    const divRight = document.createElement("div");
    const divLeft = document.createElement("div");

    const divTempGif = document.createElement("div");

    
    const imgWeather = document.createElement("img");
    const descWeather = document.createElement("p");
    const suggestWeather = document.createElement("p");
    

    //     TEMPERATURE + GIF
    const temp = document.createElement("h3");
    const gif = document.createElement("img");

    gif.classList.add("hidden");
    
    gif.setAttribute("alt", "gif icon");
    gif.setAttribute("width", "200px");
    gif.setAttribute("height", "auto");

    temp.textContent = `${parseInt(data.main.temp)} °C`;
    
    divTempGif.classList.add("gif-temp");
    divTempGif.append(temp, gif);

    //    END  TEMPERATURE + GIF




    data.weather.map((element) => {        
        gif.classList.remove("hidden");        
        gif.classList.add("gif");

        if(element.main.toLowerCase() == "clouds") {
            imgWeather.setAttribute("src", "img/cloud.png");
            

            if(parseInt(data.main.temp) >= 25){
                gif.setAttribute("src", "https://thumbs.gfycat.com/QuerulousElectricJohndory-size_restricted.gif");
                suggestWeather.textContent = "It is too hot outside! Keep yourself safe, stay hydrated";
            } else if(parseInt(data.main.temp) < 8){
                gif.setAttribute("src", "https://media.giphy.com/media/3o7TKoHNJTWWLgljYQ/giphy.gif");
                suggestWeather.textContent = "It is too cold outside! Put on your better coat and stay warm";
            } else {                
                gif.setAttribute("src", "https://th.bing.com/th/id/R.d538f7976546294953deda9d409725bf?rik=%2fF8L9Hl1vnsETQ&pid=ImgRaw&r=0");
                suggestWeather.textContent = "It may be raining, bring with you the umbrella";
            }
    

        } else if(element.main.toLowerCase() == "rain") {
            imgWeather.setAttribute("src", "img/cloud+rain.png");

            gif.setAttribute("src", "https://i.pinimg.com/originals/59/d3/8d/59d38df8aa1cfd7dea36105ea470f27f.gif");
            suggestWeather.textContent = "It's raining, stay at home if you can";
        } else if(element.main.toLowerCase() == "clear"){            
            imgWeather.setAttribute("src", "img/sun.png");

            if(parseInt(data.main.temp) > 25){
                gif.setAttribute("src", "https://thumbs.gfycat.com/QuerulousElectricJohndory-size_restricted.gif");
                suggestWeather.textContent = "It is too hot outside! Keep yourself safe, stay hydrated";
            } else if(parseInt(data.main.temp) < 8) {
                gif.setAttribute("src", "https://media.giphy.com/media/3o7TKoHNJTWWLgljYQ/giphy.gif");
                suggestWeather.textContent = "It is too cold outside! Put on your better coat and stay warm";
            } else {                
                gif.setAttribute("src", "https://cdn.dribbble.com/users/68398/screenshots/2560830/lex_dribbble.gif");    
                suggestWeather.textContent = "It's a good time to go for a walk!";
            }
        }

                        
        descWeather.textContent = `${element.description}`;
    });

    imgWeather.setAttribute("alt", "weather icon");
    imgWeather.setAttribute("width", "150px");
    imgWeather.setAttribute("height", "auto");


    divLeft.classList.add("left-zoom");
    divLeft.append( imgWeather, descWeather, suggestWeather);
    

    divRight.classList.add("right-zoom");
    divRight.append( divTempGif, zoomMinMax(data));

    divBottom.style.backgroundImage = "url('img/earth-plane.png')";
    divBottom.style.backgroundPosition = "center";
    divBottom.style.backgroundSize = "contain";
    divBottom.style.backgroundRepeat = "no-repeat";
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
    imgDrop.setAttribute("width","125px");
    imgDrop.setAttribute("height", "125px");

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

   return divAll;
}

const zoomCity = (card, data) => {
   const cityName = card.querySelector("h2").outerHTML.split("<h2>").splice(1, 2).join("").split("</h2>").splice(0,1).join("");
   const divOverDrop = document.createElement("div");
   const divDrop = document.createElement("div");
   const dropAllH4 = document.createElement("div");

   const deleteOpt = document.createElement("h4");
   const saveOpt = document.createElement("h4");

   divOverDrop.classList.add("overlay-drop");
   divOverDrop.classList.add("hidden");

   deleteOpt.setAttribute("id", "delete");
   deleteOpt.textContent = "Delete city";
   saveOpt.setAttribute("id", "save");
   saveOpt.textContent = "Put in saves";

   dropAllH4.classList.add("all-h4");
   dropAllH4.style.backgroundImage = "url('https://media.giphy.com/media/xTiN0IuPQxRqzxodZm/giphy.gif')";
   dropAllH4.style.backgroundPosition = "center";
   dropAllH4.style.backgroundSize = "cover";
   dropAllH4.append(deleteOpt, saveOpt);

   divDrop.classList.add("drop-menu");
   divDrop.classList.add("hidden");

   for(let i = 0; i < data.length; i++) {
        if(data[i].name.toLowerCase() == cityName.toLowerCase()){            
            q(".zoomed").append(divOverDrop ,divDrop, zoomedCard(data[i], cityListComplete[i]));
        }
    }

    q(".drop").addEventListener("click", () => {
        divOverDrop.classList.remove("hidden");
        divDrop.classList.remove("hidden");
        
        divDrop.append( dropAllH4);

        q("#delete").addEventListener("click", () => {
            const newArray = deleteCity(card);

            localStorage.setItem("cities", JSON.stringify(newArray));
            
            q(".drop-menu").removeChild(q(".all-h4"));
            q(".drop-menu").classList.add("hidden");
            q(".overlay-drop").classList.add("hidden");

            q(".zoomed").removeChild(q(".zoomed-card"));
            q(".zoomed").removeChild(q(".overlay-drop"));
            q(".zoomed").removeChild(q(".drop-menu"));
            
            q(".overlay-zoom").classList.add("hidden");

            location.reload();
        });

        
        q("#save").addEventListener("click", () => {
            changeSave(card);

            localStorage.setItem("cities", JSON.stringify(cityListComplete));

            q(".drop-menu").removeChild(q(".all-h4"));
            q(".drop-menu").classList.add("hidden");
            q(".overlay-drop").classList.add("hidden");

            q(".zoomed").removeChild(q(".zoomed-card"));
            q(".zoomed").removeChild(q(".overlay-drop"));
            q(".zoomed").removeChild(q(".drop-menu"));
            
            q(".overlay-zoom").classList.add("hidden");

            location.reload();
        });
    });




   q(".overlay-zoom").addEventListener("click", () => {
       q(".zoomed").removeChild(q(".zoomed-card"));
       q(".zoomed").removeChild(q(".overlay-drop"));
       q(".zoomed").removeChild(q(".drop-menu"));
       q(".overlay-zoom").classList.add("hidden");
       q(".close-zoom").classList.add("hidden");
   });

   q(".overlay-drop").addEventListener("click", () => {
        q(".drop-menu").removeChild(q(".all-h4"));
        q(".drop-menu").classList.add("hidden");
        q(".overlay-drop").classList.add("hidden");
    });
}

export { q, cityListComplete, fieldResetSaves, zoomCity}