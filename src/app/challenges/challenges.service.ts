import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Challenge } from './challenge.model';
import { DayStatus } from './day.model';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { constants } from '../../constants';
import { AuthService } from '../auth/auth.service';

/**
 * @author Alessandro Alberga
 * @description challenges service for app state on challenges.
 */
@Injectable({
  providedIn: 'root'
})
export class ChallengesService implements OnDestroy {

  private firebaseRestUrl = constants.firebaseUrl;

  /**
   * Current challenge subscribable behaviour subject.
   */
  private _currentChallenge = new BehaviorSubject<Challenge>(null);

  private userSubscription: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {
      this.userSubscription = this.authService.user.subscribe(user => {
          if (!user) {
              this._currentChallenge.next(null);
          }
      })
   }

  /**
   * Returns the created observable that will retrieve the challenge.
   */
  public fetchCurrentChallenge() {
    return this.authService.user.pipe(
      take(1),
      switchMap(currentUser => {
        if (!currentUser || !currentUser.isAuthenticated) {
          return of(false);
        }
        return this.http.get(`${this.firebaseRestUrl}/challenge/${currentUser.id}.json?auth=${currentUser.token}`)
          .pipe(
            map((res: any) => {
              if (res) {
                const loadedObject = new Challenge(
                  res.title,
                  res.description,
                  res.year,
                  res.month,
                  res._days
                );
                return loadedObject;
              }
              return null;
            }),
            tap((challenge: any) => {
            if (challenge) {
              this._currentChallenge.next(challenge);
            }
          }));
      }));
  }

  /**
   * Getter for current challenge observable.
   */
  public get currentChallenge(): Observable<Challenge> {
    // Can't call next on this, only observe!
    return this._currentChallenge.asObservable();
  }

  /**
   * Create and emit new challenge.
   *
   * @param title title of challenge
   * @param description description of challenhe
   */
  public createNewChallenge(title: string, description: string) {
    const challenge = new Challenge(
      title,
      description
    );
    this._currentChallenge.next(challenge);
    // Save to server.
    return this.saveToServer(challenge);
  }

  /**
   * Udate the existing challenge.
   *
   * @param title title of challenge.
   * @param description description of challenge.
   */
  public updateChallenge(title: string, description: string) {
    return this._currentChallenge.pipe(take(1), switchMap((challenge) => {
      challenge.title = title;
      challenge.description = description;
      // Save to server.
      this._currentChallenge.next(challenge);
      return this.saveToServer(challenge);
    }));
  }

  /**
   * Update a day's status.
   *
   * @param dayInMonth numerical day in month.
   * @param status status to change it to.
   */
  public updateDayStatus(dayInMonth: number, status: DayStatus): void {
    this._currentChallenge.pipe(take(1)).subscribe((challenge: Challenge) => {
      if (!challenge || challenge.days.length < dayInMonth) {
        return;
      }
      // Find index of day to update.
      const dayIndex = challenge.days.findIndex(day => day.dayInMonth === dayInMonth);
      challenge.days[dayIndex].status = status;
      this.saveToServer(challenge).subscribe(res => null);
      this._currentChallenge.next(challenge);
    });
  }

  /**
   * Save a challenge to the firebase uri.
   *
   * @param challenge challenge to save.
   */
  private saveToServer(challenge: Challenge) {
    return this.authService.user.pipe(take(1), switchMap(currentUser => {
      if (!currentUser || !currentUser.isAuthenticated) {
        return;
      }
      return this.http.put(`${this.firebaseRestUrl}/challenge/${currentUser.id}.json?auth=${currentUser.token}`, challenge);
    }));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
