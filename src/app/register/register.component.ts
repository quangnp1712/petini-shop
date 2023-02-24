import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  minDate!: Date;
  maxDate!: Date;
  hidePassword = true;
  hideConfirmPass = true;
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  usernameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  addressFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  dobFormControl = new FormControl('', [Validators.required]);

  getEmailErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a <strong> value </strong>';
    }

    return this.emailFormControl.hasError('email')
      ? 'Not a valid <strong>email</strong>'
      : '';
  }

  constructor(
    private http: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.minDate = new Date(currentYear - 18, 0, 1);
    this.maxDate = new Date(currentDate);
  }

  // Register
  protected register() {
    this.http
      .register(
        this.addressFormControl.value + '',
        this.dobFormControl.value + '',
        this.emailFormControl.value + '',
        this.passwordFormControl.value + '',
        this.phoneFormControl.value + '',
        this.usernameFormControl.value + ''
      )
      .subscribe((data) => {
        console.log('Succes', data);
        localStorage.setItem('registerSuccess', 'true');
        this.router.navigate(['/Login'], { relativeTo: this.route });
      });
  }
}
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
