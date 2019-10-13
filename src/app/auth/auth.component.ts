import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from '../helpers/form.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * @author Alessandro Alberga
 * @description auth component handling user authentication.
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  /**
   * Ref to the password element.
   */
  @ViewChild('usernameElement', { static: false }) usernameElement: ElementRef<any>;

  /**
   * Ref to the password element.
   */
  @ViewChild('passwordElement', { static: false }) passwordElement: ElementRef<any>;

  /**
   * Programmatic ref to the form.
   */
  public form: FormGroup;

  usernameIsValid = true;

  passwordIsValid = true;

  isLogin = true;

  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    // Configure the form.
    this.form = new FormGroup({
      username: new FormControl(null, { updateOn: 'change', validators: [Validators.required] }),
      password: new FormControl(null, { updateOn: 'change', validators: [Validators.required] })
    });
    this.form.get('username').statusChanges.subscribe(status => {
      this.usernameIsValid = status === 'VALID';
    });
    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordIsValid = status === 'VALID';
    });
  }

  private resetValidity() {
    this.passwordIsValid = true;
    this.usernameIsValid = true;
  }

  public onSwitch(): void {
    this.isLogin = !this.isLogin;
    this.resetValidity();
  }

  /**
   * Sign in.
   */
  public onSignIn(): void {
    // Use helper function pattern!
    this.formService.dismiss([
      this.usernameElement.nativeElement,
      this.passwordElement.nativeElement
    ]);
    if (!this.form.valid) { return; }
    const username = this.form.get('username');
    const password = this.form.get('password');
    this.isLoading = true;
    if (this.isLogin) {
      this.authService.login(username.value, password.value).subscribe(this.loginToAppHandler, this.loginErrHandler);
    } else {
      this.authService.signUp(username.value, password.value).subscribe(this.loginToAppHandler, this.loginErrHandler);
    }
  }

  private loginErrHandler = (err) => {
    this.isLoading = false;
    this.form.reset();
  }

  private loginToAppHandler = () => {
    this.router.navigate(['/challenges']);
    this.isLoading = false;
  }
}
