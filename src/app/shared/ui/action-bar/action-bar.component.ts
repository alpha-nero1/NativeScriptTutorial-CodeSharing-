import { Component, Input } from '@angular/core';
import { Page, isAndroid } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular';
import { UIService } from '../ui.service';

declare var android: any;

/**
 * @author Alessandro Alberga
 * @description re-usable action bar component.
 */
@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id
})
export class ActionBarComponent {

    /**
     * Input title for action bar.
     */
    @Input() public title: string;

    /**
     * Immediate toggle for showing back button or not.
     */
    @Input() public showBackButton = true;

    /**
     * Toggling wether or not we want the menu.
     */
    @Input() public hasMenu = true;

    constructor(
      private page: Page,
      private router: RouterExtensions,
      private uiService: UIService
    ) { }

    /**
     * Property to check wether or not to show the back button or not.
     */
    public get canGoBack(): boolean {
      return this.router.canGoBack() && this.showBackButton;
    }

    public get android(): boolean {
      return isAndroid;
    }

    /**
     * Perform the back action.
     */
    public goBack(): void {
      this.router.backToPreviousPage();
    }

    public onToggleMenu() {
      this.uiService.toggleDrawer();
    }

    /**
     * Function to change back button colour on action bar load.
     */
    public onLoadedActionBar(): void {
      if (isAndroid) {
        const androidActionBar = this.page.actionBar.nativeView;
        const backButton = androidActionBar.getNavigationIcon();
        if (backButton) {
          backButton.setColorFilter(android.graphics.Color.parseColor(
            '#006eff',
            (<any>android.graphics).PorterDuff.Mode.SRC_ATOP)
          )
        }
      }
    }

}
