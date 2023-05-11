const newOfferForm = document.querySelector('.ad-form');

function setMinPrice(price){
  const priceInput = document.querySelector('#price');
  priceInput.setAttribute('min', price);
  priceInput.setAttribute('placeholder', `from ${price}`);
}

export function offerTypeListener(){
  const typeInput = document.querySelector('#type');
  typeInput.addEventListener('change', onTypeChange);

  function onTypeChange(event) {
    const target = event.target;
    if (target.value == "palace") {
      setMinPrice(10000)
    }
    else if (target.value == "flat") {
      setMinPrice(1000)
    }
    else if (target.value == "house") {
      setMinPrice(5000)
    }
    else {
      setMinPrice(0)
    }
  }
}

const timeinInput = document.querySelector('#timein');
const timeoutInput = document.querySelector('#timeout');
export function offerCheckinListener(){
  timeinInput.addEventListener('change', onTimeInChange);
  timeoutInput.addEventListener('change', onTimeOutChange);
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