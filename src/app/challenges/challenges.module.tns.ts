import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { TodayComponent } from './today/today.component';
import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component.tns';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { ActionBarModule } from '../shared/ui/action-bar/action-bar.module.tns';
import { ChallengeActionsModule } from './challenge-actions/challenge-actions.module';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { NoChallengeComponent } from './no-challenge/no-challenge.component';

/**
 * @author Alessandro Alberga
 * @description challenges feature module.
 */
@NgModule({
  declarations: [
    ChallengeTabsComponent,
    CurrentChallengeComponent,
    TodayComponent,
    NoChallengeComponent,
  ],
  imports: [
    ActionBarModule,
    ChallengeActionsModule,
    ChallengesRoutingModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule
  ],
  schemas: [
    // Disables angulars standard error checks
    NO_ERRORS_SCHEMA
  ]
})
export class ChallengesModule {}
