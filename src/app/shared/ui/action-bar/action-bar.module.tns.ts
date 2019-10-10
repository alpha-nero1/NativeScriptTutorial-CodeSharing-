import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionBarComponent } from './action-bar.component.tns';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular';

/**
 * @author Alessandro Alberga
 * @description module wrapper for action bar component.
 */
@NgModule({
  declarations: [ActionBarComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule
  ],
  exports: [ActionBarComponent],
  schemas: [
    // Disables angulars standard error checks
    NO_ERRORS_SCHEMA
  ]
})
export class ActionBarModule {}
