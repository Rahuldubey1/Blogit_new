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
  mySignupForm:FormGroup;

  constructor(private router:Router, private authService:AuthServiceService) { }


  ngOnInit() {
    this.mySignupForm = new FormGroup({
      'email' : new FormControl(''),
      'password' : new FormControl(''),
    });
  }
  register(){
    this.router.navigateByUrl('/signup');
  }
  onSubmit() {
    if (this.mySignupForm.valid){
      this.authService.login(this.mySignupForm.value).subscribe(result=> {
        if( result && result.user) {
          localStorage.setItem("token",result.user.token)
        }
      })
    }     
  }


}
