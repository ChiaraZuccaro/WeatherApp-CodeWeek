import { addOption, getApi, createCard, localTime, getTimeApi } from "./function.js";

let cityList;
let time;

try {
    getTimeApi().then((data) => localTime(data.datetime));
} catch {
    console.log("orario non fetchato");
}
//     LocalStorage check
try {
    cityList = JSON.parse(localStorage.getItem("cities").split(","));
} catch {
    cityList = [
        {
            city: "Catania",
            icon: "features/liotru.jpg"
        }, 
        { 
            city: "Enna",
            icon: "features/rocca-cerere.jpg"
        }, 
        {
            city: "Caltanissetta",
            icon: "features/fontana-tritone.jpg"
        },
        {
            city: "Siracusa",
            icon: "features/dionisio.jpg"
        },
        {
            city: "Ragusa",
            icon: "features/castello-di-donnafugata.jpg"
        },
        {
            city: "Agrigento",
            icon: "features/concordia.jpg"
        },
        {
            city: "Messina",
            icon: "features/catalani.jpg"
        },
        {
            city: "Trapani",
            icon: "features/Castello-della-Colombaia.jpg"
        },
        {
            city: "Palermo",
            icon: "features/vergogna.jpg"
        } 
    ];
}


// Loading cities & creating card
for(let i = 0; i < cityList.length; i++) {
    addOption(cityList[i].city);
    getApi(cityList[i].city).then((data) => {
        createCard(data, cityList[i].icon);
    });
}
