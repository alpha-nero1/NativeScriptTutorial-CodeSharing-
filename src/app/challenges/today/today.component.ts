import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ChallengesService } from '../challenges.service';
import { Challenge } from '../challenge.model';
import { Subscription } from 'rxjs';
import { Day, DayStatus } from '../day.model';
import { Utils } from '../../utils/utils';

/**
 * @author Alessandro Alberga
 * @description today component to shoe the days challenge.
 */
@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit, OnDestroy {

  public currentDay: Day;

  private challengeSubscription: Subscription;

  public getActionName = Utils.getActionName;

  public isLoading = false;

  constructor(private challengesService: ChallengesService) { }

  ngOnInit(): void {
    this.challengeSubscription = this.challengesService.currentChallenge
      .subscribe((challenge: Challenge) => {
        if (challenge) {
          this.currentDay = challenge.currentDay;
        }
      });
    this.isLoading = true;
    this.challengesService.fetchCurrentChallenge().subscribe(res => {
      // Fetched challenge.
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      throw err;
    });
  }

  public onActionSelected(status: DayStatus): void {
    this.challengesService.updateDayStatus(this.currentDay.dayInMonth, status);
  }

  ngOnDestroy(): void {
    this.challengeSubscription.unsubscribe();
  }
}
