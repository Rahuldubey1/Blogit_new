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
  rahul:any
  error:any
  showError:boolean=false
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
    // console.log(this.form.controls.get.['username'].value)
    // this.rahul=JSON.stringify(this.updateData.value) 
    // console.log(this.rahul)
    // this.updateData.patchValue({
      
    //   username: this.updateData.value.username
      
    // })
    this.authService.getUser(this.token).subscribe(result=> {
      if(result && result.user) {
        this.userData = result.user
        // this.updateData['username'].setValue(result.user.username);
        this.updateData.patchValue({
          username: result.user.username,
          email: result.user.email,
          bio: result.user.bio
        })
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
    console.log(this.updateData.value,"hello")
    this.authService.updateUser(this.updateData.value).subscribe(result=> {
    if (result)
    {
      this.router.navigateByUrl('/')
    }
    },
    errors=>{
        this.error = errors.error.errors
        this.showError = this.showError? false:true
    }
    )
}
}