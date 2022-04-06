const q = (selector) => document.querySelector(selector);

const cityListHome = [
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
        city: "Syracuse",
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
let cityListStorage;
let cityListComplete;


//     LocalStorage check
try {
    cityListStorage = JSON.parse(localStorage.getItem("cities").split(","));
    cityListHome.push(cityListStorage);
    cityListComplete = cityListHome;
} catch {
    cityListComplete = cityListHome;
}

function fieldResetSaves() {
    let ele = document.getElementsByName("saves");

    for(let i=0; i < ele.length; i++) {        
        ele[i].checked = false;
    }
}


export { q, cityListComplete, fieldResetSaves}