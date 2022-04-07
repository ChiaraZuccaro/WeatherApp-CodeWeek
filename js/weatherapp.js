import { q, cityListComplete, fieldResetSaves, zoomCity } from "./addingCity.js";
import { addOption, getApi, createCard, selectCity, removeCard } from "./function.js";

const radioButtons = document.querySelectorAll("input[name='saves']");

let dataList = getApi(cityListComplete);

// Loading cities & creating card & filter
dataList.then((data) => {    
    for(let i = 0; i < data.length; i++) {
        addOption(data[i].name);
        createCard(data[i], cityListComplete[i]);
    }
    
    const cardEls = document.querySelectorAll(".card");
    const selector = document.querySelector("#city-selector"); 

    cardEls.forEach((element) => {
        element.addEventListener("click", () => {
            q(".overlay-zoom").classList.remove("hidden");
            zoomCity(element, data);
        });
    });





    //                        FILTER       CITY
    selector.addEventListener("click", () => {    
        if(selector.selectedIndex > 0 && selector.selectedIndex <= data.length) {
            cardEls.forEach(element => {
                if(element.querySelector("h2").outerHTML.split("<h2>").splice(1, 2).join("").split("</h2>").splice(0,1).join("").toLowerCase() == selector.value) { 
                    document.getElementById("saves-h2").style.display = "none";
                    selectCity(element);
                }
            });
        } else if(selector.selectedIndex == 0) {
            removeCard();

            document.getElementById("saves-h2").style.display = "block";
            for(let i = 0; i < data.length; i++) {
                createCard(data[i], cityListComplete[i]);
            }
            console.log(cardEls);
            cardEls.forEach((element) => {
                element.addEventListener("click", () => {
                    q(".overlay-zoom").classList.remove("hidden");
                    zoomCity(element, data);
                });
            });
        }
    });
    //                  END     FILTER       CITY
});
      





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