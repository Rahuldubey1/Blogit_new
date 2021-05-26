import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-complete-article',
  templateUrl: './complete-article.component.html',
  styleUrls: ['./complete-article.component.css']
})
export class CompleteArticleComponent implements OnInit {
  data:any
  comments:any
  token:any
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {

  this.token = localStorage.getItem("token");
  
  this.data = this.authService.getData()
  console.log(this.data,"complete1")
  }
  addComment(comment:any){
    var data = {
      body:comment,
      slug: this.data.slug,
      token: this.token
    }
    this.authService.addComment(data).subscribe(result=> {
      if(result){
        this.comments=result.comment
        console.log(this.comments,"complete")
      }
    })

  } 
  
  

}
