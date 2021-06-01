import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data:any
  profileFollow:boolean = false
  condition:boolean =  false
  favArticle:boolean = false
  constructor(private authService:AuthServiceService) { }
  selectedUserPost:any
  ngOnInit(): void {
  this.data = this.authService.getProfile()
  this.authService.getSelectedProfile(this.data.author.username).subscribe(result=>{
    if(result){
      this.selectedUserPost = result.articles
      console.log(this.selectedUserPost)
      if(this.selectedUserPost[0].author.following == true)
      {
        this.profileFollow = this.profileFollow ? false : true;
      }
    }
  })
  
  // if(this.data.author.following == true) {
  //   alert("true")
  //   this.profileFollow = this.profileFollow ? false : true;
  // }
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
  showFavBlog(data:any){
    this.authService.showFavBlog(data).subscribe(result=>{
      if(result){
        this.selectedUserPost = result.articles
        this.condition = this.condition ? false : true;
        console.log(result.articlesCount)
        if(result.articlesCount == 0){
          this.favArticle = this.favArticle ? false : true;
        }
      }
    })
  }
  show(){
    this.condition = this.condition ? false : true;
    this.authService.getSelectedProfile(this.data.author.username).subscribe(result=>{
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
}
