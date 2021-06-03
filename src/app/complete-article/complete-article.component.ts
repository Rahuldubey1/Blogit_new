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
  profileFollow:boolean = false
  articleLike:boolean = false
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {

  this.token = localStorage.getItem("token");
  this.data = this.authService.getData()
  if(this.data.author.following == true)
  {
    this.profileFollow = this.profileFollow ? false : true;
  }
  console.log(this.data.favorited)

  if(this.data.favorited == true)
  {
    this.articleLike = this.articleLike ? false : true;
  }
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
  
  follow(data:any){
    this.authService.follow(data.author.username).subscribe(result=>{
      if(result){
        this.profileFollow = this.profileFollow ? false : true;
      }
    })
  }
  
  unFollow(data:any){
    this.authService.unFollow(data.author.username).subscribe(result=>{
      if(result){
        this.profileFollow = this.profileFollow ? false : true;
      }
    })
  }
  
  like(blog:any) {
    if(blog.favorited == false) {
      alert("if")
    this.authService.addLike(blog.slug).subscribe(result=> {
      if(result){
        this.articleLike = true
      }
    })
  }
  else {
    alert("else")
    this.authService.removeLike(blog.slug).subscribe(result=> {
      if(result){
        this.articleLike = false
      }
    })
  }
  }  

}
