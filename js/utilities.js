import { offerSettings } from "./settings.js";

export function getrandomNumber(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomLocationNumber(min, max){
  min = Math.ceil(min * 100000);
  max = Math.floor(max * 100000);
  return Math.floor(Math.random() * (max - min + 1) + min)/100000;
}

export function getRandomArrayData(arr, num){
  const res = [];
  for(let i = 0; i < num; ){
    const random = Math.floor(Math.random() * arr.length);
    if(res.indexOf(arr[random]) !== -1){
      continue;
    }
    res.push(arr[random]);
    i++;
  }
  return res;
}

export function getLocation(){
  return {
    x: getRandomLocationNumber(offerSettings.location.x.min, offerSettings.location.x.max),
    y: getRandomLocationNumber(offerSettings.location.y.min, offerSettings.location.y.max)
  }
}