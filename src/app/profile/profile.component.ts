import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedUserPost:any
  userBlog:any
  token:any
  profile:any
  constructor(private authService:AuthServiceService,private router:Router) { }
 
  ngOnInit(): void {
  this.token = localStorage.getItem("token");
  this.data = this.authService.getProfile1()
  this.profile = this.authService.getProfile2()
  if(this.data){
    this.authService.getSelectedProfile(this.data.author.username).subscribe(result=>{
      if(result){
        this.selectedUserPost = result.articles
        if(this.selectedUserPost[0].author.following == true)
        {
          this.profileFollow = this.profileFollow ? false : true;
        }
      }
    })
  } else {
    this.authService.getSelectedProfile(this.profile.author.username).subscribe(result=>{
      if(result){
        this.selectedUserPost = result.articles
        if(this.selectedUserPost[0].author.following == true)
        {
          this.profileFollow = this.profileFollow ? false : true;
        }
      }
    })
  }
  }
  showFeed(blog:any)
  {
    this.userBlog = blog  
    this.authService.setData(this.userBlog)
    this.router.navigateByUrl('/complete-article')
  }
  follow(data:any){
    if(this.token) {
      this.authService.follow(data.author.username).subscribe(result=>{
        if(result){
          this.profileFollow = this.profileFollow ? false : true;
        }
      })
    } else {
      this.router.navigateByUrl('/login')
    }
  }
  unFollow(data:any){
    if(this.token) {
      this.authService.unFollow(data.author.username).subscribe(result=>{
        if(result){
          this.profileFollow = this.profileFollow ? false : true;
        }
      })
    } else {
    this.router.navigateByUrl('/login')
    }
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
    this.favArticle = this.favArticle ? false : true;
    this.condition = this.condition ? false : true;
    if(this.data) {
      this.authService.getSelectedProfile(this.data.author.username).subscribe(result=>{
        if(result){
          this.selectedUserPost = result.articles
          if(result.articlesCount == 0){
              this.favArticle = this.favArticle ? false : true;
            }
        }
      })
    } else {
      this.authService.getSelectedProfile(this.profile.author.username).subscribe(result=>{
        if(result){
          this.selectedUserPost = result.articles
          if(result.articlesCount == 0){
              this.favArticle = this.favArticle ? false : true;
            }
        }
      })
    }
  }
  like(blog:any) {
    if(this.token) {
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
    } else {
      this.router.navigateByUrl('/login')
    }
  }
}
