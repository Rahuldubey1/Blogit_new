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
  // example = { username: "", email: "", password: ""  };
  token:any;
  userData:any;
  constructor(private authService:AuthServiceService,private router:Router) { 
    this.token = localStorage.getItem("token");
  }
  userShow:boolean = false

  ngOnInit(): void {
    this.updateData = new FormGroup({
      'image' : new FormControl(''),
      'username' : new FormControl('',Validators.required),
      'bio' : new FormControl(''),
      'email' : new FormControl('',[Validators.email,Validators.required]),
      'password' : new FormControl('',[Validators.minLength(8),Validators.required,])
    });
    this.authService.getUser(this.token).subscribe(result=> {
      if(result && result.user) {
        this.userData = result.user
        console.log(this.userData)
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
    if (result)
    {
      this.router.navigateByUrl('/')
    }
    })
}
}