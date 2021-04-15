import {FormControl} from "@angular/forms";

export function cardNumberValidator(card: FormControl): { [control: string]: string } {
  let sum = 0;
  for (let i = 0; i < card.value.length; i++) {
    let cardNum = parseInt(card.value[i]);
    if (i % 2 === 0) {
      cardNum = cardNum * 2;
      if (cardNum > 9) {
        cardNum = cardNum - 9;
      }
    }
    sum += cardNum;
  }
  if (sum % 10 !== 0) {
    return {'format': 'cardNumber: incorrect format'};
  }
  return null;
}

export function cardYearValidator(card: FormControl) : { [control: string]: string } {
  if (Number('20' + card.value) < new Date().getFullYear()) {
    return {'year': 'cardYear: this card is expired'};
  }
  return null;
}
