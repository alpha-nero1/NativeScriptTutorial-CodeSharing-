import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodayComponent } from './today/today.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';

const routes: Routes = [
  { path: 'today', component: TodayComponent },
  { path: 'current', component: CurrentChallengeComponent },
  { path: ':mode',
    loadChildren: './challenge-edit/challenge-edit.module#ChallengeEditModule'
  },
  {
    path: '',
    redirectTo: 'today',
    pathMatch: 'full'
  }
];

@NgModule({
    imports: [
      RouterModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ChallengesRoutingModule {}
