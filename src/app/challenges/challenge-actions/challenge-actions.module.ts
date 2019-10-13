import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeActionsComponent } from './challenge-actions.component';

/**
 * @author Alessandro Alberga
 * @description simple wrapper module for the challenge actions component.
 */
@NgModule({
    declarations: [ChallengeActionsComponent],
    imports: [CommonModule],
    exports: [ChallengeActionsComponent],
})
export class ChallengeActionsModule {}
