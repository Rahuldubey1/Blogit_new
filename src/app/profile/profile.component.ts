import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router'

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
  selectedUser:any
  userName:any
  constructor(private authService:AuthServiceService,private router:Router, private route:ActivatedRoute ) { }
 
  ngOnInit(): void {
  // this.userName = parseInt(this.route.snapshot.paramMap.get('username')!)
  this.route.paramMap.subscribe(params => {
    this.userName = params.get("username")
 })
  console.log(this.userName)
  this.token = localStorage.getItem("token");
  // this.data = this.authService.getProfile1()
  this.profile = this.authService.getProfile2()
  if(this.userName){
    this.authService.getSelectedProfile(this.userName).subscribe(result=>{
      if(result){
        console.log(result)
        this.selectedUserPost = result.articles
        console.log(this.selectedUserPost[0].favorited)
        if(this.selectedUserPost[0].favorited == true){}
      }
    })
    this.authService.getUserProfile(this.userName).subscribe(result=>{
      if(result){
        this.selectedUser = result
        this.selectedUser = this.selectedUser.profile
        console.log(this.selectedUser)
        if(this.selectedUser.profile.following == true)
        {
          this.profileFollow = this.profileFollow ? false : true;
        }
      }
    })
  } else {
    // this.authService.getSelectedProfile(this.profile.author.username).subscribe(result=>{
    //   if(result){
    //     this.selectedUserPost = result.articles
    //     if(this.selectedUserPost[0].author.following == true)
    //     {
    //       this.profileFollow = this.profileFollow ? false : true;
    //     }
    //   }
    // })
    // this.authService.getUserProfile(this.profile.author.username).subscribe(result=>{
    //   if(result){
    //     this.selectedUser = result
    //     if(this.selectedUser.profile.following == true)
    //     {
    //       this.profileFollow = this.profileFollow ? false : true;
    //     }
    //   }
    // })
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
    alert(data)
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
    if(this.favArticle == true){
      this.favArticle = this.favArticle ? false : true;
    }
    this.condition = this.condition ? false : true;
    if(this.userName) {
      this.authService.getSelectedProfile(this.userName).subscribe(result=>{
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
        console.log("like")
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
        console.log("removelike")

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
