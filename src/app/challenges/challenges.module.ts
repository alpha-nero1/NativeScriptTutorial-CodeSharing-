import { NgModule } from '@angular/core';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { TodayComponent } from './today/today.component';
import { ChallengeActionsModule } from './challenge-actions/challenge-actions.module';
import { NoChallengeComponent } from './no-challenge/no-challenge.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { ActionBarModule } from '../shared/ui/action-bar/action-bar.module';
import { DayModalComponent } from './day-modal/day-modal.component';
import { BackdropComponent } from './day-modal/backdrop.component';
import { LoadingIndicatorModule } from '../shared/ui/loading-indicator/loading-indicator.module';

/**
 * @author Alessandro Alberga
 * @description challenges feature module.
 */
@NgModule({
  declarations: [
    BackdropComponent,
    CurrentChallengeComponent,
    DayModalComponent,
    NoChallengeComponent,
    TodayComponent
  ],
  imports: [
    ActionBarModule,
    ChallengeActionsModule,
    ChallengesRoutingModule,
    CommonModule,
    FormsModule,
    LoadingIndicatorModule
  ],
  schemas: []
})
export class ChallengesModule {}
