import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  editArticle1:FormGroup;
  addArticle1:any

  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.addArticle1 = new FormGroup({
      'title' : new FormControl(''),
      'description' : new FormControl(''),
      'body' : new FormControl(''),
      // 'tagList' : new FormControl(''),
    });
  }
  onSubmit1(){
    this.authService.addArticle(this.addArticle1.value).subscribe(result=> {
    console.log(result)
    })
  }

}
