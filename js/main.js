import { offerTypeListener, offerCheckinListener, formSubmit } from "./form.js";
import { renderMap, reloadMapMarkers } from "./map.js";
import { filterOffers } from "./filter.js";

const form = document.querySelector('.ad-form');

offerTypeListener();
offerCheckinListener();

form.addEventListener('submit', sendOffer);
async function sendOffer(event){
    offers = await formSubmit(event);
  }
  
  // FILTERING
  const filtersForm = document.querySelector('.map__filters');
  
  filtersForm.addEventListener('change', listenFilterForm);
  function listenFilterForm(event){
    const filteredOffers = filterOffers(offers, event);
    reloadMapMarkers(filteredOffers);
  }