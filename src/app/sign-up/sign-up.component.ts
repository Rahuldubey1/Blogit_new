import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
// import { FormGroupDirective } from '@angular/forms'
// import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  mySignupForm:FormGroup;



  constructor(private authService:AuthServiceService,private router:Router) { }

  ngOnInit() {
     this.mySignupForm = new FormGroup({
       'username' : new FormControl(null,Validators.required),
       'email' : new FormControl(null,[Validators.required,Validators.email]),
       'password' : new FormControl(null,[Validators.required,Validators.minLength(8)]),
     });
  }
  alreadyRegister() {
    this.router.navigateByUrl('/login')
  }
  onSubmit() {
    if (this.mySignupForm.valid){
      this.authService.signup(this.mySignupForm.value).subscribe(result=>{
        if(true){
          this.router.navigateByUrl('/login')
        }
      })
    }    
  }

}
