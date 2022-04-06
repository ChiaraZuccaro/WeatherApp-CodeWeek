import { q, cityListComplete, fieldResetSaves, zoomCity } from "./addingCity.js";
import { addOption, getApi, createCard, selectCity, removeCard } from "./function.js";

const radioButtons = document.querySelectorAll("input[name='saves']");


// Loading cities & creating card & filter
for(let i = 0; i < cityListComplete.length; i++) {
    addOption(cityListComplete[i].city);
    getApi(cityListComplete[i].city).then((data) => {
        createCard(data, cityListComplete[i]);
    }).then(() => {        
        const cardEls = document.querySelectorAll(".card");
        const selector = document.querySelector("#city-selector"); 


        cardEls.forEach((element) => {
            element.addEventListener("click", () => {
                q(".overlay-zoom").classList.remove("hidden");
                zoomCity(element);
            });
        });


        //                        FILTER       CITY
        selector.addEventListener("click", () => {    
            if(selector.selectedIndex > 0 && selector.selectedIndex <= cityListComplete.length) {            
                cardEls.forEach(element => {
                    if(element.outerHTML.toLowerCase().split("").join("").includes(selector.value)) { 
                        
                        console.log("diverso da zero");
                        document.getElementById("saves-h2").style.display = "none";
                        selectCity(element);
                    }
                });
            } else if(selector.selectedIndex == 0) {
                removeCard();

                document.getElementById("saves-h2").style.display = "block";
                getApi(cityListComplete[i].city).then((data) => {
                    createCard(data, cityListComplete[i]);
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

    let ans;
    for (const radioButton of radioButtons ) {
        if (radioButton.checked) {
            ans = radioButton.value;
            break;
        }
    };

    cityListComplete.push({
        city: inputCity.value,
        icon: inputImg.value,
        saves: `${ans}`
    });

    console.log(cityListComplete);
    localStorage.setItem("cities", JSON.stringify(cityListComplete));
    
    inputCity.value = "";
    inputImg.value = "";
    fieldResetSaves();
    location.reload();
});