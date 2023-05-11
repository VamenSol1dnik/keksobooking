let cardsParent = document.querySelector('#all-offer-cards');
let cardTemplate = document.querySelector('#card');
let cardPhotoTemplate = document.querySelector('#card-photo');


const cardsFragment = new DocumentFragment();

export function renderOffers(element){
  element.forEach(e => {
    let cardTemplateClone = cardTemplate.content.cloneNode(true);

    cardTemplateClone.querySelector('.popup__title').innerText = e.offer.title;
    cardTemplateClone.querySelector('.popup__text--address').innerText = `x:${e.offer.address.x} y:${e.offer.address.y}`;
    cardTemplateClone.querySelector('.popup__text--price').innerText = `${e.offer.price} UAH / day`;

    const propertyTypeTag = cardTemplateClone.querySelector('.popup__type');
    switch(e.offer.type){
      case 'flat':
        propertyTypeTag.innerText = 'Apartment';
        break;
      case 'bungalow':
        propertyTypeTag.innerText = 'Bungalow';
        break;
      case 'house':
        propertyTypeTag.innerText = 'House';
        break;
      case 'palace':
        propertyTypeTag.innerText = 'Palace';
        break;
    }

    cardTemplateClone.querySelector('.popup__text--capacity').innerText = `${e.offer.rooms} ${e.offer.rooms === 1 ? 'room' : 'rooms'} для ${e.offer.guests} ${e.offer.guests === 1 ? 'guest' : 'guests'}`;
    cardTemplateClone.querySelector('.popup__text--time').innerText = `Checkin after ${e.offer.checkin}, checkout before ${e.offer.checkout}`;

    e.offer.features.forEach(feature => {
      cardTemplateClone.querySelector(`.popup__feature--${feature}`).classList.remove('hidden');
    });

    cardTemplateClone.querySelector('.popup__description').innerText = e.offer.description;
    cardTemplateClone.querySelector('.popup__avatar').setAttribute('src', e.avatarUrl);

    e.offer.photos.forEach(url => {
      let cardPhotoTemplateClone = cardPhotoTemplate.content.cloneNode(true);
      cardPhotoTemplateClone.querySelector('.popup__photo').setAttribute('src', url);
      cardTemplateClone.querySelector('.popup__photos').append(cardPhotoTemplateClone);
    });



    cardsFragment.append(cardTemplateClone);
  })
  cardsParent.append(cardsFragment);
}