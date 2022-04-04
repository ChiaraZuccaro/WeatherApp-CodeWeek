const cityList = [ 
    "Catania", "Enna", "Caltanissetta",
    "Siracusa", "Ragusa", "Agrigento",
    "Messina", "Trapani", "Palermo"
];

const q = (selector) => document.querySelector(selector);

const addOption = (city) => {
    const optionEl = document.createElement("option");

    
    optionEl.value = `${city.toLowerCase()}`;
    optionEl.textContent = `${city}`;

    q("#city-selector").append(optionEl);
}

// Loading cities
for(let i = 0; i < cityList.length; i++) {
    addOption(cityList[i]);
}