import { addOption, getApi, createCard, localTime } from "./function.js";

let cityList;
let time;

localTime();

//     LocalStorage check
try {
    cityList = localStorage.getItem("cities").split(",");
} catch {
    cityList = [ 
        "Catania", "Enna", "Caltanissetta",
        "Siracusa", "Ragusa", "Agrigento",
        "Messina", "Trapani", "Palermo"
    ];
}


// Loading cities & creating card
for(let i = 0; i < cityList.length; i++) {
    addOption(cityList[i]);
    getApi(cityList[i]).then((data) => {
        time = data.timezone;
        createCard(data);
    });
}
