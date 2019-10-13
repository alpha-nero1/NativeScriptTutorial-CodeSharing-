import { NgModule } from '@angular/core';
import { ActionBarComponent } from './action-bar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * @author Alessandro Alberga
 * @description module wrapper for action bar component.
 */
@NgModule({
  declarations: [ActionBarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ActionBarComponent],
})
export class ActionBarModule {}
