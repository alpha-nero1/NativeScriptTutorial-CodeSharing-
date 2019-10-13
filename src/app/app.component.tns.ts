import { Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ViewContainerRef
} from "@angular/core";
import { UIService } from './shared/ui/ui.service';
import { Subscription } from 'rxjs';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { AuthService } from './auth/auth.service';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(RadSideDrawerComponent, { static: true }) sideDrawer: RadSideDrawerComponent;

  private drawerListener: Subscription;

  private drawer: RadSideDrawer;

  constructor(
    private uiService: UIService,
    private changeDetectionRef: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService,
    private router: RouterExtensions
  ) { }

  ngOnInit(): void {
    this.drawerListener = this.uiService.drawerState.subscribe(() => {
      if (this.drawer) {
        this.drawer.toggleDrawerState();
      }
    })
    this.uiService.setRootVCRef(this.viewContainerRef);
  }

  ngAfterViewInit(): void {
    this.drawer = this.sideDrawer.sideDrawer;
    this.changeDetectionRef.detectChanges();
  }

  public logout(): void {
    this.uiService.toggleDrawer();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.drawerListener) {
      this.drawerListener.unsubscribe()
    }
  }
}
