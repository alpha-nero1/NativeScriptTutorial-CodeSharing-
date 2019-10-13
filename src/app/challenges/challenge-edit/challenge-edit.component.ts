import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { Challenge } from '../challenge.model';
import { ChallengesService } from '../challenges.service';
import { take, switchMap } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';

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

  public isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.receivedActivatedRouteHandler();
  }

  /**
   * Simple handler for receiving activated route.
   */
  private receivedActivatedRouteHandler = () => {
    this.isLoading = true;
    return this.activatedRoute.paramMap.subscribe(paramMap => {
        // Retrieve the mode.
        if (!paramMap.has('mode')) {
          this.isEdit = false;
        } else {
          this.isEdit = (paramMap.get('mode') === 'edit');
        }
        if (this.isEdit) {
          this.challengesService.currentChallenge.pipe(take(1), switchMap(currChall => {
            if (!currChall) {
              return this.challengesService.fetchCurrentChallenge();
            }
            return of(currChall);
          })).subscribe(challenge => {
            if (challenge) {
              this.isLoading = false;
              this.challengeInput = challenge;
            }
          });
        } else {
          // Reinit!
          this.challengeInput = new Challenge('', '');
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
      ).subscribe(res => this.router.navigate(['/challenges/current']));
    } else {
      this.challengesService.createNewChallenge(
        this.challengeInput.title,
        this.challengeInput.description
      ).subscribe(res => this.router.navigate(['/challenges/current']));
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
