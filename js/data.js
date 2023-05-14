import { offerSettings } from "./settings.js";
import { getrandomNumber, getRandomArrayData, getLocation } from './utilites.js';

export function GetOffer(i){
  this.id = i;
  this.author = offerSettings.authorsNames[getrandomNumber(0, offerSettings.authorsNames.length -1)];

  let avatarIndex = getrandomNumber(offerSettings.avatarsQuantity.min,offerSettings.avatarsQuantity.max);
  this.avatarUrl = `./img/avatars/user${avatarIndex<10 ? '0'+avatarIndex : avatarIndex}.png`;

  let location = getLocation();
  this.location = location;
  this.offer = {};
  this.offer.title = offerSettings.titles[getrandomNumber(0, offerSettings.titles.length -1)];
  this.offer.address = location;
  this.offer.price = getrandomNumber(offerSettings.price.min, offerSettings.price.max);
  this.offer.type = offerSettings.offerType[getrandomNumber(0, offerSettings.offerType.length -1)];
  this.offer.rooms = getrandomNumber(offerSettings.rooms.min,offerSettings.rooms.max);
  this.offer.guests = getrandomNumber(offerSettings.guests.min,offerSettings.guests.max);
  this.offer.checkin = offerSettings.checkins[getrandomNumber(0, offerSettings.checkins.length -1)];
  this.offer.checkout = offerSettings.checkouts[getrandomNumber(0, offerSettings.checkouts.length -1)];
  this.offer.features = getRandomArrayData(offerSettings.features, getrandomNumber(1, offerSettings.features.length));
  this.offer.description = offerSettings.descriptions[getrandomNumber(0, offerSettings.descriptions.length -1)];
  this.offer.photos = getRandomArrayData(offerSettings.photos, getrandomNumber(1, offerSettings.photos.length));
}
export const offers = [];
function getStartData(){
  for(let i = 0; i < offerSettings.quantity; i++) {
    let item = new GetOffer(i);
    offers.push(item);
  }
}
getStartData();