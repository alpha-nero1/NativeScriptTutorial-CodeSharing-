import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.user.pipe(take(1), switchMap((currentUser) => {
            if (!currentUser || !currentUser.token) {
                return this.authService.autoLogin();
            }
            return of(true);
        }), tap(isAuth => {
            if (!isAuth) {
                this.router.navigate(['/auth']);
            }
        }));
    }
}
