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
  showEmailError:boolean = false
  showPasswordError:boolean = false
  showUsernameError:boolean = false
  
  error:boolean = false
  errorMessage:any



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
    if(this.mySignupForm.value.email == null || this.mySignupForm.value.password == null || this.mySignupForm.value.username == null){
      if(this.mySignupForm.value.email == null){
        if(this.showEmailError == false){
          this.showEmailError = this.showEmailError ? false:true
        }
      }
      if(this.mySignupForm.value.password == null){
        if(this.showPasswordError == false){
          this.showPasswordError = this.showPasswordError ? false:true
        }
      }
      if(this.mySignupForm.value.username == null){
        if(this.showUsernameError == false){
          console.log(this.showUsernameError)
          this.showUsernameError = this.showUsernameError ? false:true
          console.log(this.showUsernameError)
        
        }
      }
    }
    else {
      if (this.mySignupForm.valid){
        this.authService.signup(this.mySignupForm.value).subscribe(
          result=>{
            if(true){
              this.router.navigateByUrl('/login')
            }
          },
          error => {
            this.errorMessage = error.error.errors;
            this.error = this.error ? false:true
          })
        } 
      }   
    }

} 
