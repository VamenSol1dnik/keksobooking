import { offerTypeListener, offerCheckinListener, formSubmit } from "./form.js";
import { renderMap } from "./map.js";

const form = document.querySelector('.ad-form');

offerTypeListener();
offerCheckinListener();

renderMap();

form.addEventListener('submit', formSubmit);