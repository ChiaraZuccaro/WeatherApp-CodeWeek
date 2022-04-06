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


export { q, cityListComplete, fieldResetSaves}