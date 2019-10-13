import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component.tns';
import { TodayComponent } from './today/today.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';

const routes: Routes = [
    {
      path: 'tabs',
      component: ChallengeTabsComponent,
      children: [
        { path: 'today', component: TodayComponent, outlet: 'today' },
        { path: 'current', component: CurrentChallengeComponent, outlet: 'current' },
      ]
    },
    {
      path: 'today',
      component: ChallengeTabsComponent,
      children: [
        { path: 'today', component: TodayComponent, outlet: 'today' },
        { path: 'current', component: CurrentChallengeComponent, outlet: 'current' },
      ]
    },
    { path:
      ':mode',
      loadChildren: './challenge-edit/challenge-edit.module#ChallengeEditModule'
    },
    {
      path: '',
      redirectTo: '/challenges/tabs',
      pathMatch: 'full'
    }
];

@NgModule({
    imports: [
      NativeScriptRouterModule,
      NativeScriptRouterModule.forChild(routes)
    ],
    exports: [NativeScriptRouterModule]
})
export class ChallengesRoutingModule {}
