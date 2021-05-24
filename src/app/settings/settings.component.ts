import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  updateData:FormGroup;
  token:any;
  userData:any;
  constructor(private authService:AuthServiceService,private router:Router) { 
    this.token = localStorage.getItem("token");
  }
  userShow:boolean = false

  ngOnInit(): void {
    this.updateData = new FormGroup({
      'email' : new FormControl(''),
      'username' : new FormControl(''),
      'password' : new FormControl('')
    });
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
  showUser(){
    this.userShow = this.userShow ? false : true;

  }
  updateUser(){
    console.log(this.updateData.value)
    this.authService.updateUser(this.updateData.value).subscribe(result=> {
    console.log(result)
    })
}
}