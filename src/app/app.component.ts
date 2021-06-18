import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clickEventsubscription:Subscription
  activePage:number = 0;  
  
  displayActivePage(activePageNumber:number){  
    this.activePage = activePageNumber  
  }  
  title = 'social-blogging-site';
  token:any;
  userData:any
  checkUser:boolean = false 
  collapsed = true;
  constructor(public authService:AuthServiceService,private route:ActivatedRoute,){
    this.clickEventsubscription = this.authService.getUserData().subscribe(()=>{
      this.incrementCount();
      })
  }
  ngOnInit(): void {
    this.token= this.authService.getToken()
    if(this.token){
      this.authService.getUser().subscribe(result=> {
        if(result && result.user) {
          this.userData = result.user
          this.authService.setProfile(this.userData)
        } else {
          alert("errro")
        }
      })
    }
    if(this.token){
      this.checkUser = this.checkUser ? false : true;
    }
  }
  incrementCount(){
    alert("1")
    console.log(this.userData)
    this.token= this.authService.getToken()
    if(this.token){
      this.authService.getUser().subscribe(result=> {
        if(result && result.user) {
          this.userData = result.user
          this.authService.setProfile(this.userData)
        } else {
          alert("errro")
        }
      })
    }
  }
}
  
