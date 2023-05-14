import { offerSettings } from "./settings.js";
import { getrandomNumber } from "./utilites.js";
import { reloadMapMarkers } from "./map.js";

const titleInput = document.querySelector('#title');
const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const roomsInput = document.querySelector('#room_number');
const personsInput = document.querySelector('#capacity');
const descriptionInput = document.querySelector('#description');
const addressInput = document.querySelector('#address');
const timeinInput = document.querySelector('#timein');
const timeoutInput = document.querySelector('#timeout');


const featuresInputs = document.querySelectorAll('.ad-form__element.features .feature__checkbox');

function resetFrom(){
  titleInput.value = '';
  photos = [];
  avatarPreview.src = offerSettings.noPictureUrl;
  photosPreview.innerHTML = '';
}

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

roomsInput.addEventListener('change',validateRooms);
function validateRooms() {
  roomsInput.setCustomValidity('');
  if (roomsInput.value === '0') {
    roomsInput.setCustomValidity('Please enter the rooms quantity');
    roomsInput.reportValidity();
    console.log('Rooms error');
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

function onTimeInChange(event) {
    setTimeChange(event, timeoutInput)
  }
  function onTimeOutChange(event) {
    setTimeChange(event, timeinInput)
  }
  function setTimeChange(event, pairElement) {
    const target = event.target;
    pairElement.value = target.value;
  }
  
  export function offerCheckinListener(){
    timeinInput.addEventListener('change', onTimeInChange);
    timeoutInput.addEventListener('change', onTimeOutChange);
  }

  let image64bit = '';

avatarInput.addEventListener('change',avatarUpload);
function avatarUpload(event) {
  const fileUpload = event.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(fileUpload);
  reader.onloadend = function () {
    image64bit = reader.result;
    avatarPreview.src = reader.result;
  }
}

let photos = [];
photosInput.addEventListener('change',photosUpload);
function photosUpload(event) {

  for(let i = 0; i < event.target.files.length; i++){

    const fileUpload = event.target.files[i];
    const reader = new FileReader();
    reader.readAsDataURL(fileUpload);
    reader.onloadend = function () {

      photos.push(reader.result);
      console.log(photos);

      const photosFragment = new DocumentFragment();

      for(let p = 0; p < photos.length; p++) {
        const img = document.createElement("img");
        img.src = photos[p];
        img.alt = '';
        img.classList.add('ad-form__photo');
        photosFragment.appendChild(img);
      }

      photosPreview.innerHTML = '';
      photosPreview.append(photosFragment);
    }
  }
}
  
  function newOfferPost(){
    const offerPost = {}

    offerPost.author = offerSettings.authorsNames[getrandomNumber(0, offerSettings.authorsNames.length -1)];
    offerPost.avatarUrl = image64bit;
  
    const addressCoordinates = addressInput.value.split(' ');
    offerPost.location = {}
    offerPost.location.x = addressCoordinates[0];
    offerPost.location.y = addressCoordinates[1];
    offerPost.offer = {};
    offerPost.offer.title = titleInput.value;
    offerPost.offer.address = {};
    offerPost.offer.address.x = addressCoordinates[0];
    offerPost.offer.address.y = addressCoordinates[1];
    offerPost.offer.price = priceInput.value;
  
    const offerTypeFiltered = offerSettings.offerType.filter(item => {
      return item.name === typeInput.value;
    });
    offerPost.offer.type = offerTypeFiltered[0] ;
    offerPost.offer.rooms = roomsInput.value;
    offerPost.offer.guests = personsInput.value;
    offerPost.offer.checkin = timeinInput.value;
    offerPost.offer.checkout = timeoutInput.value;
    offerPost.offer.features = [];
  
    featuresInputs.forEach(input => {
      if (input.checked) {
        offerPost.offer.features.push(input.value);
      }
    });
  
    offerPost.offer.description = descriptionInput.value;
    offerPost.offer.photos = getRandomArrayData.photos;
    return offerPost;
  }


export function formSubmit(event){
  event.preventDefault();

  if (validateTitle() && validatePrice() && validateRooms() && validateGuests() ) {

    let newOfferData = newOfferPost();
    resetFrom();

    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(newOfferData).toString()
    };
    return fetch("http://localhost:4000/offer", requestOptions)
      .then(response => response.json())
      .then((data) => {
        reloadMapMarkers(data);
        return data;
      });
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