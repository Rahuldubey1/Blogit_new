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
    console.log(this.editData.title)
    this.addArticle = new FormGroup({
      'title' : new FormControl('',Validators.required),
      'description' : new FormControl('',Validators.required),
      'body' : new FormControl('',Validators.required)
    });
  }
  
  onSubmit(){
    if(this.addArticle.value.title == "" || this.addArticle.value.description == ""
        || this.addArticle.value.body == "") {
          this.article = true
    } else {
      this.authService.addArticle(this.addArticle.value).subscribe(result=> {
        if(result) {
          this.router.navigateByUrl('/')
        }
      })
    }
  }
}
