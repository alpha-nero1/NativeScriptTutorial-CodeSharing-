import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  constructor(private router: RouterExtensions) { }

  public replace(navArray: any[]): void {
    this.router.navigate(navArray, { clearHistory: true });
  }
}
