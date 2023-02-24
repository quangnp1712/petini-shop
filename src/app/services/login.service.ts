import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'my-auth-token'
    })
  };

  private REST_API_SERVER = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public login(username : string, password:string) {
    var value = {
      password,
      username
    };
    console.log(value);
    const url =`${this.REST_API_SERVER}/api/user/login`;

    return this.httpClient
    .post<any>(url,value ,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      error.error["message"]);
  };
  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
