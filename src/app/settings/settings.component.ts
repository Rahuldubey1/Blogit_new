import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  token:any;
  userData:any;
  constructor(private authService:AuthServiceService,private router:Router) { 
    this.token = localStorage.getItem("token");
  }

  ngOnInit(): void {
    this.authService.getUser(this.token).subscribe(result=> {
      if(result && result.user) {
        this.userData = result.user
      } else {
        alert("sdfg")
      }
    })
  }

  public logout()
  {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }

}
