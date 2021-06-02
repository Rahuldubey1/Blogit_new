import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-user-proflie',
  templateUrl: './user-proflie.component.html',
  styleUrls: ['./user-proflie.component.css']
})
export class UserProflieComponent implements OnInit {
  data:any
  condition:boolean = false
  selectedUserPost:any
  favArticle:any
  constructor(private authService:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    this.data = this.authService.getProfile()
    this.authService.getSelectedProfile(this.data.username).subscribe(result=>{
      if(result){
        console.log(result)
        this.selectedUserPost = result.articles
        console.log(this.selectedUserPost)
      }
    })
  }
  showFavBlog(data:any){
    this.authService.showFavBlog(data).subscribe(result=>{
      if(result){
        this.selectedUserPost = result.articles
        this.condition = this.condition ? false : true;
        if(result.articlesCount == 0){
          this.favArticle = this.favArticle ? false : true;
        }
      }
    })
  }
  show(){
    this.condition = this.condition ? false : true;
    this.authService.getSelectedProfile(this.data.username).subscribe(result=>{
      if(result){
        this.selectedUserPost = result.articles
      }
    })
    this.favArticle = this.favArticle ? false : true;
  }
  like(blog:any) {
    if(blog.favorited == false) {
    this.authService.addLike(blog.slug).subscribe(result=> {
      if(result){
        blog.favoritesCount = blog.favoritesCount + 1
        blog.favorited = true
      }
    })
  }
  else {
    this.authService.removeLike(blog.slug).subscribe(result=> {
      if(result){
        blog.favoritesCount = blog.favoritesCount - 1
        blog.favorited = false
      }
    })
  }
  }
  edit(){
  this.router.navigateByUrl('/settings')
}
}