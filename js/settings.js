export const offerSettings = {

    mapCenter: [35.6804334,139.7689218],
    mapZoom: 13,
    mapMaxZoom: 13,
    authorsNames: ['Mike','Bob','Dany'],
    titles: ['Good apartment','Nice green house','Hotel room', 'Duplex for all', 'Be my guest', 'Party house', 'Small room for the rest', 'Grandmas penthouse'],
    quantity: 10,
    offerType: [
        {name: 'palace',en: 'Palace', ua: 'Палац'},
        {name: 'flat',en: 'Apartment', ua: 'Квартира'},
        {name: 'house',en: 'House', ua: 'Будинок'},
        {name: 'bungalow',en: 'Bungalow', ua: 'Бунгало'}],

        offerTypePrice: {
            default: 0,
            palace: 10000,
            house: 5000,
            flat: 1000,
            bungalow: 0,
          },
          guestsFromRooms: {
            0: [0],
            1: [1,2],
            2: [1,2,3],
            3: [1,2,3],
            4: [4],
            5: [4,5,6],
          },
          // temporary data base
          authorsNames: ['Ben','joe','Sam'],
          titles: ['Good apartment','Nice green house','Hotel room', 'Duplex for all', 'Be my guest', 'Party house', 'Small room for the rest', 'Grandmas penthouse'],
          quantity: 10,

    price: {
      min: 1000,
      max: 8000,
    },
    checkins: ['12:00',' 13:00', '14:00'],
    checkouts: ['12:00',' 13:00', '14:00'],
    features: ['wifi', 'dishwasher','parking', 'washer', 'elevator', 'conditioner'],
    descriptions: [
      'Wonderful place for vacay.',
      'Good place for conferences.',
      'peaceful view to sea and beach',
      'Nice and cheap choice for tourists.',
      'Rent for few days only.',
      'Safe kids area is available on the territory.'
    ],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    avatarsQuantity: {
      min: 1,
      max: 8,
    },
    rooms: {
      min: 1,
      max: 4,
    },
    guests: {
      min: 1,
      max: 4,
    },
    location: {
      x: {
        min: 35.65000,
        max: 35.70000
      },
      y: {
        min: 139.70000,
        max: 139.80000
      }
    }
  }