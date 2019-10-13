import { NgModule } from '@angular/core';
import { ChallengeEditComponent } from './challenge-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionBarModule } from '../../shared/ui/action-bar/action-bar.module';

/**
 * @author Alessandro Alberga
 * @description challenge edit feature module.
 */
@NgModule({
  declarations: [ChallengeEditComponent],
  imports: [
    CommonModule,
    ActionBarModule,
    // forChild import alone does not unlock directives for us.
    RouterModule,
    RouterModule.forChild([
      { path: '', component: ChallengeEditComponent }
    ]),
    FormsModule
  ],
  exports: [ChallengeEditComponent],
})
export class ChallengeEditModule {}
