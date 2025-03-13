import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  getMessageError(fieldName: string, form: FormGroup) {
    const errorObject = form.controls[fieldName].errors;
    if (!errorObject) return null;
    for (const key of Object.keys(errorObject)) {
      switch (key) {
        case 'required':
          return `Campo es requerido`;
        case 'min':
          return 'Valor mínimo de 5';
        default:
          return null;
      }
    }
    return null;
  }

  public getErrors(fieldName: string, form: FormGroup) {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  public getErrorArray(fieldName: string, form: FormGroup) {
    return (
      form.controls[fieldName].value.length === 0 &&
      form.controls[fieldName].touched
    );
  }
}
