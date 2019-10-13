import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ChallengeEditComponent } from './challenge-edit.component';
import { NativeScriptRouterModule, NativeScriptFormsModule } from 'nativescript-angular';
import { ActionBarModule } from '../../shared/ui/action-bar/action-bar.module';

/**
 * @author Alessandro Alberga
 * @description challenge edit feature module.
 */
@NgModule({
  declarations: [ChallengeEditComponent],
  imports: [
    NativeScriptCommonModule,
    // forChild import alone does not unlock directives for us.
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([
      { path: '', component: ChallengeEditComponent }
    ]),
    ActionBarModule,
    NativeScriptFormsModule
  ],
  exports: [ChallengeEditComponent],
  schemas: [
    // Disables angulars standard error checks
    NO_ERRORS_SCHEMA
  ]
})
export class ChallengeEditModule {}
