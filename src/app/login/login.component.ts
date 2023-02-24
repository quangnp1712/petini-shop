import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  hide = true;
  passwordFormControl = new FormControl('', [Validators.required]);
  usernameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();


  constructor(
    private http: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  protected login() {


    this.http.login(
      this.usernameFormControl.value + '',
      this.passwordFormControl.value + ''
      ).subscribe((data) => {
      localStorage.setItem('userToken', data['token']);
      localStorage.setItem('username', data['username']);
      console.log(data);
      this.loggedIn.next(true);

      this.router.navigate([''], { relativeTo: this.route, });
    },
    (error) => {
      if (error['status'] == 500) {
        console.log('please check your information again!') ;
      } else {

        console.log(error);
      }
    }
    );
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
