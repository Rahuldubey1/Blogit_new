import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  

  constructor(private authService:AuthServiceService,private router:Router) {
  }
  addArticle:any
  article:boolean=false
  editData:any
  ngOnInit(): void {
    this.editData = this.authService.getEditData()
    console.log(this.editData)
    this.addArticle = new FormGroup({
      'title' : new FormControl('',Validators.required),
      'description' : new FormControl('',Validators.required),
      'body' : new FormControl('',Validators.required)
    });
    if(this.editData){
      this.addArticle.patchValue({
        title: this.editData.title,
        body: this.editData.body,
        description: this.editData.description
      })
    }
  }
  
  onSubmit(){
    if(this.addArticle.value.title == "" || this.addArticle.value.description == ""
        || this.addArticle.value.body == "") {
          this.article = true
    } else if(this.editData){
      console.log(this.editData.slug,"ghjk")
      this.authService.updateArticle(this.addArticle.value,this.editData.slug).subscribe(result=>{
        if(result){
          this.router.navigateByUrl("/user-profile")
        }
      })
    }
    else {
      alert("hhshsh")
      this.authService.addArticle(this.addArticle.value).subscribe(result=> {
        if(result) {
          this.router.navigateByUrl('/')
        }
      })
    }
  }
}
