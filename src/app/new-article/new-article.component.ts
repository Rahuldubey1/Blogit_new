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
  

  constructor(private authService:AuthServiceService,private router:Router) { }
  addArticle:any
  ngOnInit(): void {
    this.addArticle = new FormGroup({
      'title' : new FormControl(''),
      'description' : new FormControl(''),
      'body' : new FormControl('')
      // 'tagList' : new FormControl(''),
    });
  }
    onSubmit(){
      console.log(this.addArticle.value)
      this.authService.addArticle(this.addArticle.value).subscribe(result=> {
        if(result) {
          this.router.navigateByUrl('/')
        }
        // console.log(result)
      })
    }
  
}
