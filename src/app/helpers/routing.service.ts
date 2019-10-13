import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  constructor(private router: Router) { }

  public replace(navArray: any[]): void {
    this.router.navigate(navArray, { replaceUrl: true });
  }
}
