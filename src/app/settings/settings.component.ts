import { Component, OnInit, OnChanges } from '@angular/core';
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
  showPasswordError:boolean=false
  showUsernameError:boolean=false
  showEmailError:boolean=false


  constructor(private authService:AuthServiceService,private router:Router) { 

  }
  userShow:boolean = false

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.updateData = new FormGroup({
      'image' : new FormControl(''),
      'username' : new FormControl('',Validators.required),
      'bio' : new FormControl('',[Validators.required,Validators.maxLength(200),Validators.minLength(20)]),
      'email' : new FormControl('',[Validators.email,Validators.required]),
      'password' : new FormControl('',[Validators.minLength(8),Validators.required,])
    });
    console.log(this.updateData.value.bio.lenght)
    this.authService.getUser().subscribe(result=> {
      if(result && result.user) {
        this.userData = result.user
        this.updateData.patchValue({
          username: result.user.username,
          email: result.user.email,
          bio: result.user.bio
        })
      } 
    })
  }
  get userName() {
    return this.updateData.get('bio')
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
  if(this.updateData.value.password == '' || this.updateData.value.email == '' || this.updateData.value.username == '') {
    if(this.updateData.value.username == ''){
      this.showUsernameError = this.showUsernameError ? false:true
    } 
    if(this.updateData.value.email == ''){
      this.showEmailError = this.showEmailError ? false:true
    } 
    if(this.updateData.value.password == ''){
      if(this.showPasswordError == false){
      this.showPasswordError = this.showPasswordError ? false:true
    }
  }
  }
  else {
    this.authService.updateUser(this.updateData.value).subscribe(result=> {
    if (result) {
      this.router.navigateByUrl('/')
    }
    })
  }
  }
}