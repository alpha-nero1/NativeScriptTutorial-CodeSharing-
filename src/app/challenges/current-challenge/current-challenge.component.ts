import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChallengesService } from '../challenges.service';
import { Challenge } from '../challenge.model';
import { Subscription } from 'rxjs';
import { Day, DayStatus } from '../day.model';
import { Utils } from '../../utils/utils';

/**
 * @author Alessandro Alberga
 * @description current challenge component to view current challenge.
 */
@Component({
    selector: 'app-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.scss']
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {

  public weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  public currentChallenge: Challenge;

  private challengeSubscription: Subscription;

  public isLoading = false;

  public selectedDay: Day;

  utils = Utils;

  constructor(
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
    this.challengeSubscription = this.challengesService.currentChallenge
      .subscribe((challenge: Challenge) => {
        this.currentChallenge = challenge;
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

  /**
   * Show the change status modal.
   */
  public onChangeStatus(day: Day): void {
    // If not settable, backout!
    if (!this.getIsSettable(day.dayInMonth)) { return; }
    this.selectedDay = day;
  }

  public getRow(index: number, day: Day): number {
    // Row 0 is occupied!
    const startRow = 2;
    const rowForWeek = Math.floor(index / 7);
    const firstWeekDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).getDay();
    const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
    return startRow + rowForWeek + irregularRow;
  }

  public onUpdateStatus(selectedStatus: DayStatus) {
    if (selectedStatus === DayStatus.Open) {
      return;
    }
    this.challengesService.updateDayStatus(this.selectedDay.dayInMonth, selectedStatus);
    this.selectedDay = null;
  }

  public getIsSettable(dayInMonth: number) {
    return dayInMonth <= new Date().getDate();
  }

  ngOnDestroy(): void {
    this.challengeSubscription.unsubscribe();
  }
}
