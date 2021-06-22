import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  updateData:FormGroup;
  notAllowedName=['rahul','shubham','kanika']
  submitted:any
  name:any
  constructor(private formBuilder: FormBuilder){}
  
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  ngOnInit(): void {
    this.updateData = this.formBuilder.group({
      'firstName' : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      'lastName' : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      'username' : new FormControl('',[Validators.maxLength(30),Validators.required,this.NaNames.bind(this)]),
      'number' : new FormControl('',[Validators.required,Validators.pattern('[- +()0-9]+')]),
      'confirmPassword' : new FormControl('',[Validators.required,Validators.maxLength(20),Validators.minLength(8)]),
      'email' : new FormControl('',[Validators.email,Validators.pattern(this.emailRegEx),Validators.required]),
      'password' : new FormControl('',[Validators.minLength(8),Validators.maxLength(20),Validators.required,]),
      'about' : new FormControl('',[Validators.minLength(20),Validators.maxLength(200),Validators.required,]),
      itemRows:this.formBuilder.array([this.inItemRow])
    },{
        validator: this.MustMatch('password', 'confirmPassword')
    })
}
  inItemRow(){
    return this.formBuilder.group({
      skills:['']
    })
  }
  updateUser(){
    this.submitted = true
    console.log(this.updateData)
  }
  NaNames(control:FormControl){
    this.name=control.value
    this.name = this.name.toLowerCase()
    if(this.notAllowedName.indexOf(this.name)!==-1){
      return{'nameisnotallowed':true}
    }
    return null;
  }
  get fromArr(){
    return (this.updateData.get('itemRows') as FormArray).controls;
  }
  addskills(){
    this.fromArr.push(this.inItemRow())
    // (<FormArray>this.updateData.get('skills')).push(new FormControl(null,Validators.required))
  }
  getValue(){
    return this.updateData.get('skills') as FormArray
  }
  get f(){
    return this.updateData.controls
  }
  MustMatch(controlName: string, matchingControlName:string){
    console.log(this)
    return (formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.mustMatch){
        return
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch:true})
      }
      else{
        matchingControl.setErrors(null)
      }
    }
  }
  // checkPasswords(control:FormControl) {
  //   console.log(this.updateData.value)
  //   // const password = control.get('password')!.value;
  //   // console.log(this.updateData.value.password)
  //   const confirmPassword = control.value;
  //   console.log(confirmPassword)
  //   console.log(confirmPassword)
  
  //   return confirmPassword === confirmPassword ? null : { notSame: true }     
  // }
}
