import { Injectable } from '@angular/core';
import { setString, getString, hasKey, remove } from 'tns-core-modules/application-settings';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  public storeString(key: string, value: string): void {
    setString(key, value);
  }

  public hasKey(key: string): boolean {
    return Boolean(hasKey(key));
  }

  public getString(key: string): string {
    return getString(key);
  }

  public remove(key: string): void {
    remove(key);
  }
}
