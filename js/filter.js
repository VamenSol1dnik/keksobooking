import { offerSettings } from "./settings.js";

const filterSettings = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: {
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false,
  }
}

function checkPrice(offer, filter) {
  switch (filter.price) {
    case 'low':
      return (offer.offer.price <= offerSettings.priceLevel.low);
    case 'middle':
      return (offer.offer.price <= offerSettings.priceLevel.middle);
    case 'high':
      return (offer.offer.price >= offerSettings.priceLevel.middle);
  }
}

function updateFilterSettings(inputTarget, inputName, inputValue) {
  switch (inputName){
    case 'type':
    case 'rooms':
    case 'guests':
    case 'price':
      filterSettings[inputName] = inputValue;
      break;
    case 'wifi':
    case 'dishwasher':
    case 'parking':
    case 'washer':
    case 'elevator':
    case 'conditioner':
      if (inputTarget.checked){
        filterSettings.features[inputName] = inputValue;
      }
      else {
        filterSettings.features[inputName] = false;
      }
      break;
  }
  console.log('filter settings: ',filterSettings);
}

export function filterOffers(offersArray, event){
  console.log('=================================');
  console.log('all offers: ', offersArray);

  const inputTarget = event.target;
  const inputName = inputTarget.getAttribute('id').split('-')[1];
  const inputValue = inputTarget.value;

  updateFilterSettings(inputTarget, inputName, inputValue);

  const offersArrayClone = JSON.parse(JSON.stringify(offersArray));

  const offersArrayFiltered = offersArrayClone.filter(getFilteredOffers);
  function getFilteredOffers(currentOffer){

    return (
      (filterSettings.type === 'any' || currentOffer.offer.type.name === filterSettings.type) &&
      (filterSettings.rooms === 'any' || currentOffer.offer.rooms === filterSettings.rooms) &&
      (filterSettings.guests === 'any' || currentOffer.offer.guests === filterSettings.guests) &&
      (filterSettings.price === 'any' || checkPrice(currentOffer, filterSettings)) &&
      (filterSettings.features.wifi === false || currentOffer.offer.features.includes(filterSettings.features.wifi)) &&
      (filterSettings.features.dishwasher === false || currentOffer.offer.features.includes(filterSettings.features.dishwasher)) &&
      (filterSettings.features.parking === false || currentOffer.offer.features.includes(filterSettings.features.parking)) &&
      (filterSettings.features.washer === false || currentOffer.offer.features.includes(filterSettings.features.washer)) &&
      (filterSettings.features.elevator === false || currentOffer.offer.features.includes(filterSettings.features.elevator)) &&
      (filterSettings.features.conditioner === false || currentOffer.offer.features.includes(filterSettings.features.conditioner))
      );
  }
  console.log('filtered offers: ', offersArrayFiltered);
  console.log('=================================');
  return offersArrayFiltered;
}
