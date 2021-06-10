import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activePage:number = 0;  
  
  displayActivePage(activePageNumber:number){  
    this.activePage = activePageNumber  
  }  
  title = 'social-blogging-site';
  token:any;
  userData:any
  checkUser:boolean = false 
  collapsed = true;
  constructor(public authService:AuthServiceService){
    
  }
  ngOnChange(){
    this.authService.getUser().subscribe(result=> {
      if(result && result.user) {
        this.userData = result.user
        this.authService.setProfile(this.userData)
      } else {
      }
    })
  }
  ngOnInit(): void {
    this.token= this.authService.getToken()

    this.authService.getUser().subscribe(result=> {
      if(result && result.user) {
        this.userData = result.user
        console.log(this.userData)
        this.authService.setProfile(this.userData)
      } else {
      }
    })
  
    if(this.token){
      this.checkUser = this.checkUser ? false : true;
    }
  }
}
  
