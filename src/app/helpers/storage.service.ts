import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  public storeString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public hasKey(key: string): boolean {
    return Boolean(localStorage.getItem(key));
  }

  public getString(key: string): string {
    return localStorage.getItem(key);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
