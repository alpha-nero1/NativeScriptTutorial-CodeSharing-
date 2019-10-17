import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { ChallengesService } from '../challenges.service';

/**
 * @author Alessandro Alberga
 * @description component housing our tabs.
 */
@Component({
  selector: 'app-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css'],
})
export class ChallengeTabsComponent implements OnInit {

  public isLoading = false;

  constructor(
    private router: RouterExtensions,
    private active: ActivatedRoute,
    private page: Page,
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.challengesService.fetchCurrentChallenge().subscribe(res => {
      // Fetched challenge.
      this.isLoading = false;
      this.loadTabRoutes();
    }, err => {
      this.isLoading = false;
      this.loadTabRoutes();
      throw err;
    });

    // Hide duplicate action bar.
    this.page.actionBarHidden = true;
  }

  private loadTabRoutes() {
    setTimeout(() => {
      // Configure our tab navigation.
      this.router.navigate([
        {
         outlets: {
           current: ['current'],
           today: ['today']
         }
        }
      ], {
          relativeTo: this.active
        });
    }, 10);
  }
}
