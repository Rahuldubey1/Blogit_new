import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  mySigninForm:FormGroup;
  showEmailError:boolean = false
  showPasswordError:boolean = false
  error:boolean = false
  errorMessage:any
  constructor(private router:Router, private authService:AuthServiceService) { }


  ngOnInit() {
    this.mySigninForm = new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null,[Validators.required,Validators.minLength(8)]),
    });
  }
  register() {
    this.router.navigateByUrl('/register');
  }
  onSubmit() {
    if(this.mySigninForm.value.email == null || this.mySigninForm.value.password == null){
      if(this.mySigninForm.value.email == null){
        if(this.showEmailError == false){
          this.showEmailError = this.showEmailError ? false:true
        }
      }
      if(this.mySigninForm.value.password == null){
        if(this.showPasswordError == false){
          this.showPasswordError = this.showPasswordError ? false:true
        }
      }
    }
    else {
      if (this.mySigninForm.valid){
        this.authService.login(this.mySigninForm.value).subscribe(
          result=> {
          if( result && result.user) {
            this.authService.setProfile(result.user)
            localStorage.setItem("token",result.user.token)
            this.router.navigateByUrl('/')
            this.authService.setUserData()
          } else {
            alert("this is error");
          }
        },
        error => {
          this.errorMessage = error.error.errors;
          if(this.error == false) {
            this.error = this.error ? false:true
          }
        })
      }     
    }
  }
}
