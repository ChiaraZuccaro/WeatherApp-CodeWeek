import { addForm, cityListHome } from "./addingCity.js";
import { addOption, getApi, createCard, selectCity, removeCard } from "./function.js";


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


// form
document.getElementById("add").addEventListener("click", () => {
    addForm();
    document.getElementById("add").classList.remove("add-btn");
    document.getElementById("add").classList.add("hidden");
});
