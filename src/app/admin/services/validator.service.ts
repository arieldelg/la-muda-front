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
        case 'maxlength': {
          const { maxlength } = errorObject;
          return fieldName !== 'tags'
            ? `Máximo de caracteres es de ${maxlength.requiredLength} actualmente es de ${maxlength.actualLength}`
            : `Máximo de tags es de ${maxlength.requiredLength} actualmente es de ${maxlength.actualLength}`;
        }
        default:
          return null;
      }
    }
    return null;
  }

  public getErrors(fieldName: string, form: FormGroup, triggerForm: boolean) {
    if (triggerForm) {
      return form.controls[fieldName].errors;
    }

    return (
      form.controls[fieldName].errors &&
      !form.controls[fieldName].hasError('required')
    );
  }

  public getErrorArray(fieldName: string, form: FormGroup) {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }
}
