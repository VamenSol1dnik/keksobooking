import { offerSettings } from "./settings.js";


const titleInput = document.querySelector('#title');
const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const roomsInput = document.querySelector('#room_number');
const personsInput = document.querySelector('#capacity');
const descriptionInput = document.querySelector('#description');
const addressInput = document.querySelector('#address');
const timeinInput = document.querySelector('#timein');
const timeoutInput = document.querySelector('#timeout');
// const wifiInput = document.querySelector('#feature-wifi');
// const dishwasherInput = document.querySelector('#feature-dishwasher');
// const parkingInput = document.querySelector('#feature-parking');
// const washerInput = document.querySelector('#eature-washer');
// const elevatorInput = document.querySelector('#feature-elevator');
// const conditionerInput = document.querySelector('#feature-conditioner');

titleInput.addEventListener('change',validateTitle);
function validateTitle() {
  titleInput.setCustomValidity('');
  if (titleInput.value === '') {
    titleInput.setCustomValidity('Please enter the title');
    titleInput.reportValidity();
    console.log('Title error');
    return false
  }
  else {
    return true
  }
}

priceInput.addEventListener('change',validatePrice);
function validatePrice() {
  priceInput.setCustomValidity('');
  if (priceInput.value === '') {
    priceInput.setCustomValidity('Please enter the price');
    priceInput.reportValidity();
    console.log('Price error');
    return false
  }
  else {
    return true
  }
}

personsInput.addEventListener('change',validateGuests);
function validateGuests() {
  personsInput.setCustomValidity('');
  if (personsInput.value === '0') {
    personsInput.setCustomValidity('Please enter the guests quantity');
    personsInput.reportValidity();
    console.log('Guests error');
    return false
  }
  else {
    return true
  }
}


export function formSubmit(event){
  event.preventDefault();

  if (validateTitle() && validatePrice() && validateGuests()) {
    console.log(`
        Form data to send\n
        Title: ${titleInput.value}\n
        Type: ${typeInput.value}\n
        Price: ${priceInput.value}\n
        Rooms: ${roomsInput.value}\n
        Persons: ${personsInput.value}\n
        Description: ${descriptionInput.value}\n
        Address coordinates: ${addressInput.value}\n
        Check in time: ${timeinInput.value}\n
        Check out time: ${timeoutInput.value}\n
        Features: ...
        `)
  }


}

roomsInput.addEventListener('change', updateGuests);
function updateGuests() {
  const guestOptions = personsInput.querySelectorAll('option');
  guestOptions.forEach(option => {option.setAttribute('disabled','disabled')});

  const guestsNumbers = offerSettings.guestsFromRooms[roomsInput.value];
  guestsNumbers.forEach(guestsNumber => {
    personsInput.querySelector(`option[value="${guestsNumber}"]`).removeAttribute('disabled');
  })
  personsInput.value = 0;
}
updateGuests();

function setMinPrice(price){
    priceInput.setAttribute('min', price);
  priceInput.setAttribute('placeholder', `from ${price}`);
}

export function offerTypeListener(){

  typeInput.addEventListener('change', onTypeChange);

  function onTypeChange(event) {
    const target = event.target;
    setMinPrice(offerSettings.offerTypePrice[target.value]);
  }
}


function onTimeInChange(event) {
  setTimeChange(event, timeoutInput)
}
function setTimeChange(event, pairElement) {
  const target = event.target;
  pairElement.value = target.value;
}

export function offerCheckinListener(){
  timeinInput.addEventListener('change', onTimeInChange);
  timeoutInput.addEventListener('change', onTimeOutChange);
}
