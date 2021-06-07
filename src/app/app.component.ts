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
  collapsed = true;
  constructor(public authService:AuthServiceService){
    
  }
  ngOnChange(){
    alert("hello")
    this.authService.getUser().subscribe(result=> {
      if(result && result.user) {
        console.log(result)
        this.userData = result.user
        this.authService.setProfile(this.userData)
      } else {
        alert("errro")
      }
    })
  }
  ngOnInit(): void {
    this.token= this.authService.getToken()
    console.log(this.token)

    this.authService.getUser().subscribe(result=> {
      if(result && result.user) {
        console.log(result)
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
