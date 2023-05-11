
let cardTemplate = document.querySelector('#card');
let cardPhotoTemplate = document.querySelector('#card-photo');

export function renderOffer(e){

    const cardTemplateClone = cardTemplate.content.cloneNode(true);
    cardTemplateClone.querySelector('.popup__title').innerText = `№${e.id} ${e.offer.title}`;
    cardTemplateClone.querySelector('.popup__text--address').innerText = `x:${e.offer.address.x} y:${e.offer.address.y}`;
    cardTemplateClone.querySelector('.popup__text--price').innerText = `${e.offer.price} UAH / day`;
    cardTemplateClone.querySelector('.popup__type').innerText = e.offer.type.en;

    
    cardTemplateClone.querySelector('.popup__text--capacity').innerText = `${offerSettings.roomsTranslations[e.offer.rooms].en}
     ${offerSettings.guestsTranslations[e.offer.guests].en}`;

    cardTemplateClone.querySelector('.popup__text--time').innerText = `Checkin after ${e.offer.checkin},
     checkout before ${e.offer.checkout}`;

    e.offer.features.forEach(feature => {
      cardTemplateClone.querySelector(`.popup__feature--${feature}`).classList.remove('hidden');
    });

    cardTemplateClone.querySelector('.popup__description').innerText = e.offer.description;
    cardTemplateClone.querySelector('.popup__avatar').setAttribute('src', e.avatarUrl);

    e.offer.photos.forEach(url => {
      const cardPhotoTemplateClone = cardPhotoTemplate.content.cloneNode(true);
      cardPhotoTemplateClone.querySelector('.popup__photo').setAttribute('src', url);
      cardTemplateClone.querySelector('.popup__photos').append(cardPhotoTemplateClone);
    });



    const temporaryTag = document.createElement('div');
    temporaryTag.appendChild(cardTemplateClone);
    return temporaryTag.innerHTML;

}