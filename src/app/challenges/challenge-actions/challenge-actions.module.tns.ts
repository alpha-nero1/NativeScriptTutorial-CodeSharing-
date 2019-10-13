import { NgModule } from '@angular/core';
import { ChallengeActionsComponent } from './challenge-actions.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

/**
 * @author Alessandro Alberga
 * @description simple wrapper module for the challenge actions component.
 */
@NgModule({
    declarations: [ChallengeActionsComponent],
    imports: [NativeScriptCommonModule],
    exports: [ChallengeActionsComponent],
})
export class ChallengeActionsModule {}
