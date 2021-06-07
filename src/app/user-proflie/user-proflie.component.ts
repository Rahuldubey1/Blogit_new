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
  favArticle:boolean=false
  userBlog:any
  constructor(private authService:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    this.data = this.authService.getProfile()
    console.log(this.data,"g")
    this.authService.getSelectedProfile(this.data.username).subscribe(result=>{
      if(result){
        console.log(result.articlesCount)
        if(result.articlesCount == 0){
          this.favArticle = this.favArticle ? false : true;
        }
        else{
        this.selectedUserPost = result.articles
        }
      }
    })
    
  }
  showFeed(blog:any)
  {
    this.userBlog = blog  
    this.authService.setData(this.userBlog)
    this.router.navigateByUrl('/complete-article')
  }
  showProfile(blog:any) { 
    if(blog.author.username == this.data.username){
  } else {
      this.userBlog = blog
      this.authService.setProfile1(this.userBlog)
      this.router.navigateByUrl('/profile')
    }
  }
  showFavBlog(data:any){
    this.authService.showFavBlog(data).subscribe(result=>{
      if(result){
        if(result.articlesCount == 0){
            if(this.favArticle == false){
              this.favArticle = this.favArticle ? false : true;
              this.condition = this.condition ? false : true;

          console.log(this.favArticle)
          } else {
            this.condition = this.condition ? false : true;

          }
        } 
        else {
          if(this.favArticle == true){
            this.favArticle = this.favArticle ? false : true;
          }
          this.selectedUserPost = result.articles
          this.condition = this.condition ? false : true;

  
        }
      
      } 
    })
  }
  show(){
    if(this.favArticle == true){
      alert("3")

      this.favArticle = this.favArticle ? false : true;
    }
    this.condition = this.condition ? false : true;
    this.authService.getSelectedProfile(this.data.username).subscribe(result=>{
      if(result){
        this.selectedUserPost = result.articles
        if(result.articlesCount == 0){
          alert("4")

          this.favArticle = this.favArticle ? false : true;
        }
      }
    })
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