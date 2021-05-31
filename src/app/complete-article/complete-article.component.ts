import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-complete-article',
  templateUrl: './complete-article.component.html',
  styleUrls: ['./complete-article.component.css']
})
export class CompleteArticleComponent implements OnInit {
  data:any 
  comments:any=[]
  token:any
  commentss:string = ''
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {

  this.token = localStorage.getItem("token");
  
  this.data = this.authService.getData()
  
  }
  addComment(){
    var data = {
      body:this.commentss,
      slug: this.data.slug,
      token: this.token
    }
    this.authService.addComment(data).subscribe(result=> {
      if(result){
        this.comments.push(result.comment)
        console.log(this.comments)
        this.commentss = ''
      }
    })
    

  } 
  
  

}
