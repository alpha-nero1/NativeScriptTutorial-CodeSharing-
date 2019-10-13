import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from '../../constants';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of, Observable } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs';
import { User } from './user.model';
import { RoutingService } from '../helpers/routing.service';
import { DialogService } from '../helpers/dialog.service';
import { StorageService } from '../helpers/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _user = new BehaviorSubject<User>(null);

  private tokenExpTimer: any;

  private signupUrl =
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${constants.firebaseAPIToken}`;

  private signinUrl =
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${constants.firebaseAPIToken}`;

  constructor(
    private http: HttpClient,
    private routeringService: RoutingService,
    private dialogService: DialogService,
    private storageService: StorageService
  ) { }

  get user() {
    return this._user.asObservable();
  }

  public autoLogin(): Observable<boolean> {
    if (!this.storageService.hasKey('user')) {
      // We have stored data of the user.+
      return of(false);
    }
    // parse the json into an object we may use.
    const userData = JSON.parse(this.storageService.getString('user'));
    // Get an instance back.
    const userFromDisk = new User(
     userData.email,
     userData.localId,
     userData._token,
     new Date(userData._tokenExpirationDate)
    );

    if (userFromDisk.isAuthenticated) {
      this._user.next(userFromDisk);
      this.autoLogout(userFromDisk.timeToExpiry);
      return of(true);
    }
    return of(false);
  }

  public autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(this.logout, expDuration);
  }

  public signUp(email: string, password: string) {
    return this.http.post<AuthResData>(this.signupUrl, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleErr), tap((res) => this.resHandler(res, email)));
  }

  public login(email: string, password: string) {
    return this.http.post<AuthResData>(this.signinUrl, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleErr), tap((res) => this.resHandler(res, email)));
  }

  public logout = () => {
    this.storageService.remove('user');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this._user.next(null);
    this.routeringService.replace(['/auth']);
  }

  private resHandler = (res: AuthResData, email: string) => {
    if (res && res.idToken) {
      const expirationDate = new Date(new Date().getTime() + (+res.expiresIn * 1000));
      const user = new User(
        email,
        res.localId,
        res.idToken,
        expirationDate
      );
      // Set the user in the disk. (String encoded).
      this.storageService.storeString('user', JSON.stringify(user));
      this.autoLogout(user.timeToExpiry);
      this._user.next(user);
    }
  }

  /**
   * Handle the auth errors.
   */
  private handleErr = (error: any) => {
    const errMessage = error.error.message ? error.error.message : null;
    switch (errMessage) {
      case 'EMAIL_EXISTS':
        // Uses system alert.
        this.dialogService.alert('This email already exists');
        break;
      case 'INVALID_PASSWORD':
        // Uses system alert.
        this.dialogService.alert('Email or password incorrect.');
        break;
      default:
        this.dialogService.alert('Authentication failed.');
    }
    return throwError(errMessage);
  }
}

/**
 * Simple interface for what we get back from firebase.
 */
interface AuthResData {
  kind: string;
  idToken: string;
  emailField: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
