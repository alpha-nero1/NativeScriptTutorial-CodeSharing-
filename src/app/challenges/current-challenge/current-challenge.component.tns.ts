import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular';
import { DayModalComponent } from '../day-modal/day-modal.component.tns';
import { UIService } from '../../shared/ui/ui.service';
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
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.scss']
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {

  public weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  public currentChallenge: Challenge;

  private challengeSubscription: Subscription;

  constructor(
    private modelDialogService: ModalDialogService,
    private uiService: UIService,
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
    this.challengeSubscription = this.challengesService.currentChallenge
      .subscribe((challenge: Challenge) => {
        this.currentChallenge = challenge;
      });
  }

  /**
   * Show the change status modal.
   */
  public onChangeStatus(day: Day): void {
    // If not settable, backout!
    if (!this.getIsSettable(day.dayInMonth)) { return; }
    // We must pass in our component and the view container ref.
    this.modelDialogService.showModal(DayModalComponent, {
      fullscreen: true,
      viewContainerRef: this.uiService.getRootVCRef(),
      context: {
        date: day.date,
        action: Utils.getActionName(day)
      }
    })
    .then((status: DayStatus) => {
      this.challengesService.updateDayStatus(day.dayInMonth, status);
    });
  }

  public getRow(index: number, day: Day): number {
    // Row 0 is occupied!
    const startRow = 1;
    const rowForWeek = Math.floor(index / 7);
    const firstWeekDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).getDay();
    const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
    return startRow + rowForWeek + irregularRow;
  }

  public getIsSettable(dayInMonth: number) {
    return dayInMonth <= new Date().getDate();
  }

  ngOnDestroy(): void {
    this.challengeSubscription.unsubscribe();
  }
}
