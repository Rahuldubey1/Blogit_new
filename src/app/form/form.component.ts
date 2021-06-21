import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  updateData:FormGroup;
  notAllowedName=['rahul','shubham','kanika']
  constructor() { }

  ngOnInit(): void {
    this.updateData = new FormGroup({
      'firstName' : new FormControl('',Validators.required),
      'lastName' : new FormControl('',Validators.required),
      'username' : new FormControl('',[Validators.maxLength(30),Validators.required,this.NaNames.bind(this)]),
      'number' : new FormControl('',[Validators.required,Validators.pattern('[- +()0-9]+')]),
      'confirmPassword' : new FormControl('',[Validators.required,Validators.minLength(8)]),
      'email' : new FormControl('',[Validators.email,Validators.required]),
      'password' : new FormControl('',[Validators.minLength(8),Validators.required,]),
      'about' : new FormControl('',[Validators.minLength(20),Validators.required,]),
      'skills' : new FormArray([
        new FormControl(null,Validators.required),
      ])

    });
  }
  updateUser(){
    console.log(this.updateData)
  }
  NaNames(control:FormControl){
    if(this.notAllowedName.indexOf(control.value)!==-1){
      return{'nameisnotallowed':true}
    }
    return null;
  }
  addskills(){
    (<FormArray>this.updateData.get('skills')).push(new FormControl(null,Validators.required))
  }
  getValue(){
    return this.updateData.get('skills') as FormArray
  }
  // checkPasswords(group: FormGroup) {
  //   const password = this.updateData.get('password')!.value;
  //   const confirmPassword = this.updateData.get('confirmPassword')!.value;
  
  //   return password === confirmPassword ? null : { notSame: true }     
  // }

}
