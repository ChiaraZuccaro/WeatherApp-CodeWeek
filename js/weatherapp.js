import { q, cityListComplete } from "./addingCity.js";
import { addOption, getApi, createCard, selectCity, removeCard } from "./function.js";


// Loading cities & creating card & filter
for(let i = 0; i < cityListComplete.length; i++) {
    addOption(cityListComplete[i].city);
    getApi(cityListComplete[i].city).then((data) => {
        createCard(data, cityListComplete[i].icon);
    }).then(() => {        
        const cardEls = document.querySelectorAll(".card");
        const selector = document.querySelector("#city-selector");
        
        //                        FILTER       CITY
        selector.addEventListener("click", () => {    
            if(selector.selectedIndex > 0 && selector.selectedIndex <= cityListComplete.length) {            
                cardEls.forEach(element => {
                    if(element.outerHTML.toLowerCase().split("").join("").includes(selector.value)) {
                        selectCity(element);
                    }
                });
            } else {        
                removeCard();
                getApi(cityListComplete[i].city).then((data) => {
                    createCard(data, cityListComplete[i].icon);
                });
            }
        });
        
        //                  END     FILTER       CITY
    });
}


// form
document.getElementById("confirm").addEventListener("click", () => {
    event.preventDefault();
    const inputCity = q("#city");
    const inputImg = q("#img");

    cityListComplete.push({
        city: inputCity.value,
        icon: inputImg.value,
        saves: ""
    });

    console.log(cityListComplete);
        
    for(let i = 0; i < cityListComplete.length; i++) {
        localStorage.setItem("cities", JSON.stringify(cityListComplete[i]));
        console.log("storage");
    }
    inputCity.value = "";
    inputImg.value = "";
});
