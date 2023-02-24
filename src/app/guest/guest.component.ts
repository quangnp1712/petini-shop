import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit{
  onActivate(event:any) {
    // window.scroll(0,0);
    window.scrollTo(0,0);
    // window.scroll({
    //         top: 0,
    //         left: 0,
    //  });
    //  document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)

 }
 isLogin= false;
 public isLoggedIn$: Observable<boolean> = new Observable<boolean>();

 ngOnInit(): void {
  console.log(this.isLogin);
     if(localStorage.getItem('userToken')){
      this.isLogin=true;
      console.log(this.isLogin);
      console.log(localStorage.getItem('userToken'));
     }else{
      this.isLogin=false;
     }
     this.isLoggedIn$ = this.loginService.isLoggedIn();
     console.log(this.isLoggedIn$);
 }

 checkLogin(){
  if(localStorage.getItem('userToken')){
    this.isLogin=true;
    console.log(this.isLogin);
   }
   else{
    this.isLogin=false;
   }
 }
 constructor(
  private router: Router,private route: ActivatedRoute,
  public loginService : LoginService
 ){

 }

 logout(){
  localStorage.clear();
  this.isLogin=false;
    this.router.navigate(['..'], {relativeTo: this.route});
 }


}
