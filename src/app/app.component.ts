import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'social-blogging-site';
  token:any;
  userData:any
  checkUser:boolean = false  
  constructor(public authService:AuthServiceService){}
  
  ngOnInit(): void {
    this.token= this.authService.getToken()
    this.authService.getUser(this.token).subscribe(result=> {
      if(result && result.user) {
        this.userData = result.user
        this.authService.setProfile(this.userData)
      } else {
        alert("errro")
      }
    })
    if(this.token){
      this.checkUser = this.checkUser ? false : true;
    }
  }
}
