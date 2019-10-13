import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor() {}

  public alert(message: string): void {
    alert(message);
  }
}
