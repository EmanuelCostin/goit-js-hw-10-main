import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
const loaderDiv = document.querySelector(".loader");
const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const errorDiv = document.querySelector(".error");
var allCats = null;
axios.defaults.headers.common["x-api-key"] = "live_9Ub8yHvqY3sMtla4Snr3gcPXcKYZMFFUvH2c7sGGGHrWq8q6a9ImzWwyAwfYFfhV";

fetchBreeds().then(cats => {
    allCats = cats;    
    breedSelect.classList.replace("show-content", "hide-content"); 

    for(cat of cats ){
            const newOption = document.createElement("option");
            newOption.text = cat.name;
            newOption.value = cat.id;
            breedSelect.appendChild(newOption);
        }
        breedSelect.classList.replace("hide-content","show-content"); 
        loaderDiv.classList.replace("show-content", "hide-content");
    })
    .catch(error => {
        breedSelect.classList.replace("show-content", "hide-content"); 
        loaderDiv.classList.replace("show-content", "hide-content"); 
        errorDiv.classList.add("show-content"); 
    });
 
const populateCatInfo = (event) => {
    selectedCat = event.target.value;
    for(cat of allCats) {
        if(cat.id == selectedCat) {
            loaderDiv.classList.replace("hide-content","show-content");
            fetchCatByBreed(selectedCat).then(catInfo => {
                catInfoDiv.innerHTML = "";
                catInfoBioElem = document.createElement("div");
                catInfoBioElem.classList.add("cat-bio");

                addImage(catInfo[0].url);
                addCatName(catInfoBioElem);
                addCatDescription(catInfoBioElem);
                addCatTemperament(catInfoBioElem);
                
                catInfoDiv.appendChild(catInfoBioElem);
                loaderDiv.classList.replace("show-content", "hide-content"); 
                })
              .catch(error => {
                errorDiv.classList.replace("hide-content","show-content");
                loaderDiv.classList.replace("show-content", "hide-content"); 
              });
            break;
        }
    }
  }; 

  function addCatTemperament(catInfoBioElem){
    tempSpanElem = document.createElement("span");
    tempSpanElem.classList.add("cat-temp-span");
    tempSpanElemValue = document.createTextNode("Temperament: ");
    tempSpanElem.appendChild(tempSpanElemValue);


    temperamentElem = document.createElement("p");
    temperamentElem.classList.add("cat-temp-p");
    catTempElem = document.createTextNode(cat.temperament);
    temperamentElem.appendChild(tempSpanElem);
    temperamentElem.appendChild(catTempElem);

    catInfoBioElem.appendChild(temperamentElem);
}

  function addCatDescription(catInfoBioElem){
    descrElem = document.createElement("p");
    descrElem.classList.add("cat-desc-p");
    catNameElem = document.createTextNode(cat.description);
    descrElem.appendChild(catNameElem);
    catInfoBioElem.appendChild(descrElem);
}

function addCatName(catInfoBioElem){
    nameElem = document.createElement("p");
    nameElem.classList.add("cat-name-p");
    catNameElem = document.createTextNode(cat.name);
    nameElem.appendChild(catNameElem);
    catInfoBioElem.appendChild(nameElem);
}

  function addImage(url){
    elemImag = document.createElement("img");
    elemImag.setAttribute("src", url);
    elemImag.setAttribute("height", 350);
    elemImag.setAttribute("width", 400);
    elemImag.classList.add("cat-image"); 
    catInfoDiv.appendChild(elemImag);
}
breedSelect.addEventListener("change", populateCatInfo );


document.addEventListener("DOMContentLoaded", (event) => {
    errorDiv.style.color = "#FF0000";
    errorDiv.classList.add("hide-content"); 
    breedSelect.classList.add("hide-content"); 
    loaderDiv.classList.add("show-content");   
  });