const q = (selector) => document.querySelector(selector);

let cityListHome;


//     LocalStorage check
try {
    cityListHome = JSON.parse(localStorage.getItem("cities").split(","));
} catch {
    cityListHome = [
        {
            city: "Catania",
            icon: "features/liotru.jpg",
            saves: ""
        }, 
        { 
            city: "Enna",
            icon: "features/rocca-cerere.jpg",
            saves: ""
        }, 
        {
            city: "Caltanissetta",
            icon: "features/fontana-tritone.jpg",
            saves: ""
        },
        {
            city: "Siracusa",
            icon: "features/dionisio.jpg",
            saves: ""
        },
        {
            city: "Ragusa",
            icon: "features/castello-di-donnafugata.jpg",
            saves: ""
        },
        {
            city: "Agrigento",
            icon: "features/concordia.jpg",
            saves: ""
        },
        {
            city: "Messina",
            icon: "features/catalani.jpg",
            saves: ""
        },
        {
            city: "Trapani",
            icon: "features/Castello-della-Colombaia.jpg",
            saves: ""
        },
        {
            city: "Palermo",
            icon: "features/vergogna.jpg",
            saves: ""
        } 
    ];
}




function fieldResetSaves() {
    let ele = document.getElementsByName("saves");

    for(let i=0; i < ele.length; i++) {        
        ele[i].checked = false;
    }
}




//                   ADD    CITY
const addForm = () => {
    const form = document.createElement("form");

    const labelCity = document.createElement("label");
    const inputCity = document.createElement("input");
    const divCity = document.createElement("div");

    const labelImg = document.createElement("label");
    const inputImg = document.createElement("input");
    const divImg = document.createElement("div");

    const buttonAdd = document.createElement("button");

    labelCity.setAttribute("for", "city");
    inputCity.setAttribute("id", "city");
    inputCity.setAttribute("type", "text");
    inputCity.setAttribute("placeholder", "write here the city...");

    divCity.classList.add("user-add");
    divCity.append( labelCity, inputCity);

    labelImg.setAttribute("for", "img");
    inputImg.setAttribute("id", "img");
    inputImg.setAttribute("type", "url");
    inputImg.setAttribute("placeholder", "an url is needed");

    divImg.classList.add("user-add");
    divImg.append( labelImg, inputImg);

    //                  SAVES
    const divAllCheck = document.createElement("div");
    const divAllLabel = document.createElement("div");

    const pCheck = document.createElement("p");
    pCheck.textContent = "Do you want it in saves?";

    const labelYes = document.createElement("label");
    const inputYes = document.createElement("input");
    const divYes = document.createElement("div");

    const labelNo = document.createElement("label");
    const inputNo = document.createElement("input");
    const divNo = document.createElement("div");

    labelNo.setAttribute("for", "no-check");
    inputNo.setAttribute("id", "no-check");
    inputNo.setAttribute("type", "radio");
    inputNo.setAttribute("name", "saves");
    inputNo.setAttribute("value", "no");

    labelNo.textContent = "No";

    divNo.classList.add("labels");
    divNo.append(labelNo, inputNo);

    labelYes.setAttribute("for", "yes-check");
    inputYes.setAttribute("id", "yes-check");
    inputYes.setAttribute("type", "radio");
    inputYes.setAttribute("name", "saves");    
    inputYes.setAttribute("value", "yes");

    labelYes.textContent = "Yes";

    divYes.classList.add("labels");
    divYes.append(labelYes, inputYes);

    divAllLabel.classList.add("choice");
    divAllLabel.append(divYes, divNo);

    divAllCheck.classList.add("all-check");
    divAllCheck.append(pCheck, divAllLabel);

    //          END    SAVES

    buttonAdd.setAttribute("id", "confirm");
    buttonAdd.setAttribute("type", "submit");

    labelCity.textContent = "What city do you want to display?";

    labelImg.textContent = "What is the most iconic monument?";

    buttonAdd.textContent = "Confirm";

    form.append(divCity, divImg, divAllCheck, buttonAdd);

    q(".add-city").append(form);



    //    click event of confirm button
    document.getElementById("confirm").addEventListener("click", () => {
        event.preventDefault();

        

        cityListHome.push({
            city: inputCity.value,
            icon: inputImg.value
        });


        
        for(let i = 0; i < cityListHome.length; i++) {
            localStorage.setItem("cities", JSON.stringify(cityListHome[i]));
        }
        inputCity.value = "";
        inputImg.value = "";
        document.getElementById("add").classList.add("add-btn");
        document.getElementById("add").classList.remove("hidden");
    });
}
//                END   ADD    CITY


export { addForm, q, cityListHome}