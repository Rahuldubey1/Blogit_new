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

  constructor(private router:Router, private authService:AuthServiceService) { }


  ngOnInit() {
    this.mySigninForm = new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null,Validators.required),
    });
  }
  register(){
    this.router.navigateByUrl('/register');
  }
  onSubmit() {
    if (this.mySigninForm.valid){
      this.authService.login(this.mySigninForm.value).subscribe(result=> {
        if( result && result.user) {
          localStorage.setItem("token",result.user.token)
          this.router.navigateByUrl('/')
        } else {
          alert("sdfg");
        }
      })
    }     
  }


}
