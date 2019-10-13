import { Component, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { UIService } from '../ui.service';
import { Router } from '@angular/router';
import { inputType } from 'tns-core-modules/ui/dialogs/dialogs';
import { AuthService } from '../../../auth/auth.service';

declare var android: any;

/**
 * @author Alessandro Alberga
 * @description re-usable action bar component.
 */
@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent {

    /**
     * Input title for action bar.
     */
    @Input() public title: string;

    @Input() public hasChallenge = false;

    constructor(
      private authService: AuthService
    ) { }

    onLogout() {
      this.authService.logout();
    }
}
