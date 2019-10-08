import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormService {

  /**
   * Belissima!!
   *
   * @param inputFields dismiss inputs.
   */
  dismiss(inputFields: TextField[]): void {
    inputFields.forEach(input => input.focus());
    inputFields[inputFields.length - 1].dismissSoftInput();
  }
}
