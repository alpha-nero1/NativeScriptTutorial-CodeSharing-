import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * @author Alessandro Alberga
 * @description UI service
 */
@Injectable({
  providedIn: 'root'
})
export class UIService {
  /**
   * Rxjs behaviour subject to listen unto toggle event.
   */
  private _drawerState = new BehaviorSubject<void>(null);

  private _rootVCRef: ViewContainerRef;

  setRootVCRef(vcRef: ViewContainerRef) {
    this._rootVCRef = vcRef;
  }

  /**
   * Getter for toggle drawer observable.
   */
  public get drawerState(): Observable<void> {
    return this._drawerState.asObservable();
  }

  public getRootVCRef() {
    return this._rootVCRef;
  }

  public toggleDrawer(): void {
    this._drawerState.next(null)
  }
}
