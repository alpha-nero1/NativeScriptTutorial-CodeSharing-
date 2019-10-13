import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { NativeScriptHttpModule } from 'nativescript-angular';
import { AuthGuard } from './auth/auth.guard';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { ChallengeActionsModule } from './challenges/challenge-actions/challenge-actions.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DayModalComponent
  ],
  imports: [
    AppRoutingModule,
    ChallengeActionsModule,
    HttpClientModule,
    NativeScriptHttpModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule
  ],
  entryComponents: [DayModalComponent],
  providers: [AuthGuard, HttpClientModule],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
