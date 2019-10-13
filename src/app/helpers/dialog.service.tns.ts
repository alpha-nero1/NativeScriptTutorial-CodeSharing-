import { Injectable } from '@angular/core';
import { alert } from 'tns-core-modules/ui/dialogs/dialogs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor() {}

  public alert(message: string): void {
    alert(message);
  }
}
