import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable()
export class ValidationErrorsService {

  public errorValidationField(control: AbstractControl, name: string): string {
    if (control.errors.required) {
      return `${name} field is required`;
    } else if (control.errors.minlength) {
      return `min length is ${control.errors.minlength.requiredLength} symbols`;
    } else if (control.errors.maxlength) {
      return `max length is ${control.errors.maxlength.requiredLength} symbols`;
    } else if (control.errors.email) {
      return `incorrect format`;
    } else if (control.errors.pattern) {
      if (name === 'password') {
        return `only latin letters, digits and special characters`;
      } else if (name === 'firstName') {
        return `only latin letters`;
      } else if (name === 'lastName') {
        return `only latin letters`;
      } else if (name === 'phone') {
        return `incorrect format`;
      }
    } else {
      return `invalid data`;
    }
  }

  public errorValidationAddress(control: AbstractControl, name: string): string {
    if (control.errors.minlength) {
      if (name === 'zip') {
        return `length must be ${control.errors.minlength.requiredLength} digits`;
      } else {
        return `min length is ${control.errors.minlength.requiredLength} symbols`;
      }
    } else if (control.errors.maxlength) {
      if (name === 'zip') {
        return `length must be ${control.errors.maxlength.requiredLength} digits`;
      } else {
        return `max length is ${control.errors.maxlength.requiredLength} symbols`;
      }
    } else if (control.errors.required) {
      return `${name} field is required`;
    } else if (control.errors.pattern) {
      if (name === 'country') {
        return `only latin letters`;
      } else if (name === 'city') {
        return `only latin letters`;
      } else if (name === 'zip') {
        return `only digits`;
      } else if (name === 'address') {
        return `only ',' ' ', latin letters and digits`;
      }
    } else {
      return `invalid data`;
    }
  }

  public errorValidationCard(control: AbstractControl, name: string): string {
    if (control.errors.minlength) {
      if (name === 'cardName') {
        return `${name}: min length is ${control.errors.minlength.requiredLength} symbols`;
      } else {
        return `${name}: length must be ${control.errors.minlength.requiredLength} digits`;
      }
    } else if (control.errors.maxlength) {
      return `${name}: max length is ${control.errors.maxlength.requiredLength} symbols`;
    } else if (control.errors.required) {
      return `${name} field is required`;
    } else if (control.errors.pattern) {
      if (name === 'cardNumber') {
        return `${name}: only digits`;
      } else if (name === 'cardMonth') {
        return `${name}: only numbers from '01' to '12'`;
      } else if (name === 'cardYear') {
        return `${name}: only numbers from '20' to '99'`;
      } else if (name === 'cardCCV') {
        return `${name}: only numbers from '000' to '999'`;
      } else if (name === 'cardName') {
        return `${name}: only latin letters`;
      }
    }
    else if(control.errors.format) {
      return control.errors.format;
    }
    else if(control.errors.year) {
      return control.errors.year;
    } else {
      return `${name}: invalid data`;
    }
  }
}
