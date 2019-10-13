import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute, RouterExtensions } from 'nativescript-angular';
import { Subscription } from 'rxjs';
import { Challenge } from '../challenge.model';
import { ChallengesService } from '../challenges.service';
import { take } from 'rxjs/operators';

/**
 * @author Alessandro Alberga
 * @description edit challenge component.
 */
@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss']
})
export class ChallengeEditComponent implements OnInit, OnDestroy {

  /**
   * Easy toggle to see if we are editing.
   */
  public isEdit = false;

  /**
   * Cleanup subscription variable for the route.
   */
  private routeSubscription: Subscription;

  /**
   * Init the form input.
   */
  public challengeInput = new Challenge('', '');

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageRoute: PageRoute,
    private router: RouterExtensions,
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.pageRoute.activatedRoute
    .subscribe(this.receivedActivatedRouteHandler)
  }

  /**
   * Simple handler for receiving activated route.
   */
  private receivedActivatedRouteHandler = (activatedRoute) => {
    activatedRoute.paramMap.subscribe(paramMap => {
        // Retrieve the mode.
        if (!paramMap.has('mode')) {
          this.isEdit = false
        } else {
          this.isEdit = (paramMap.get('mode') === 'edit');
        }
        if (this.isEdit) {
          this.challengesService.currentChallenge.pipe(take(1)).subscribe(challenge => {
            this.challengeInput = challenge;
          });
        }
    });
  }

  /**
   * Submission handler for challenge input.
   */
  public onSubmit(): void {
    if (this.isEdit) {
      this.challengesService.updateChallenge(
        this.challengeInput.title,
        this.challengeInput.description
      )
      .subscribe(res => this.router.backToPreviousPage());
    } else {
      this.challengesService.createNewChallenge(
        this.challengeInput.title,
        this.challengeInput.description
      )
      .subscribe(res => this.router.backToPreviousPage());
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
