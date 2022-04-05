import { addOption, getApi, createCard, selectCity, removeCard } from "./function.js";

let cityListHome;
let time;


//     LocalStorage check
try {
    cityListHome = JSON.parse(localStorage.getItem("cities").split(","));
} catch {
    cityListHome = [
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

// Loading cities & creating card & filter
for(let i = 0; i < cityListHome.length; i++) {
    addOption(cityListHome[i].city);
    getApi(cityListHome[i].city).then((data) => {
        createCard(data, cityListHome[i].icon);
    }).then(() => {        
        const cardEls = document.querySelectorAll(".card");
        const selector = document.querySelector("#city-selector");
        
        //                        FILTER       CITY
        selector.addEventListener("click", () => {    
            if(selector.selectedIndex > 0 && selector.selectedIndex <= cityListHome.length) {            
                cardEls.forEach(element => {
                    if(element.outerHTML.toLowerCase().split("").join("").includes(selector.value)) {
                        selectCity(element);
                    }
                });
            } else {        
                removeCard();
                getApi(cityListHome[i].city).then((data) => {
                    createCard(data, cityListHome[i].icon);
                });
            }
        });
        
        //                  END     FILTER       CITY
    });
}