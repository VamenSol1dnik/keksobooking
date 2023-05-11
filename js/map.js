import { offers } from './data.js';
import { renderOffer } from "./cards.js";
import { offerSettings } from "./settings.js";

const formSection = document.querySelector('.notice');
const addressInput = document.querySelector('#address');

let customMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [25, 35],
  iconAnchor: [13, 35],
  popupAnchor: [0, -40],
});
let customMarkerIconSmall = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [0, -35],
});

function disableForm(){
  formSection.classList.add('disabled');
  console.log('form disabled');
}
function enableForm(){
  formSection.classList.remove('disabled');
  console.log('form enabled');
}
function updateCoordinates(event){
  addressInput.value = `${event.target.getLatLng().lat} ${event.target.getLatLng().lng}`
}

export function renderMap(){
  disableForm();

  let map = L.map('map', {
    center: offerSettings.mapCenter,
    zoom: offerSettings.mapZoom,
  });
  console.log('map rendered');
  map.whenReady(enableForm);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: offerSettings, mapMaxZoom,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  renderMainMarker(map);
  renderMapOffers(map);
}


function renderMainMarker(map) {
  let mainMarker = L.marker(offerSettings.mapCenter, {icon: customMarkerIcon, draggable: true}).addTo(map);
  mainMarker.bindPopup("Choose Location").openPopup();
  mainMarker.on('drag', updateCoordinates);
}

function renderMapOffers(map) {
  const mapMarkersData = [];
  for (let i = 0; i < offers.length; i++){
    let popupContent = renderOffer(offers[i]);
      mapMarkersData.push(L.marker([offers[i].location.x, offers[i].location.y], {icon: customMarkerIconSmall}).bindPopup(popupContent));
    }
  L.featureGroup(mapMarkersData).addTo(map);
}