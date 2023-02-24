import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  private REST_API_SERVER = 'http://localhost:8080';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'my-auth-token'
    }),
  };

  private handleError(error: HttpErrorResponse) {
    return throwError(
      error.error["message"]);
  };

  public register(
    address: string,
    dob: string,
    email: string,
    password: string,
    phone: string,
    username: string
  ) {
    var value = {
      address,
      dob,
      email,
      password,
      phone,
      username
    };
    const url = `${this.REST_API_SERVER}/api/user/customer-register`;
    console.log(url);
    return this.httpClient
      .post<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
