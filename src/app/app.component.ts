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
  
  constructor(public authService:AuthServiceService){}
  
  ngOnInit(): void {
    console.log(this.authService.getToken())
    // this.token = localStorage.getItem("token");
  }
}
