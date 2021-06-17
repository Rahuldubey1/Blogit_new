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
  name:any
  name1:any
  articleCount:any
  myInputMessage:any
  number:number

  constructor(private authService:AuthServiceService,private router:Router, private route:ActivatedRoute ) {
      route.params.subscribe(val => {
        this.token = localStorage.getItem("token");
        this.authService.getUser().subscribe(result=>{
          if(result){
            this.name = result.user.username

          }
        })
        if(val.username){
          this.authService.getSelectedProfile(val.username,'').subscribe(result=>{
            if(result){
              if(result.articlesCount == 0){
                this.favArticle = this.favArticle ? false : true;
              }
              this.selectedUserPost = result.articles
              this.articleCount = (result.articlesCount/10)
              this.myInputMessage = this.articleCount
              if(this.selectedUserPost[0].favorited == true){}
            }
          })
          this.authService.getUserProfile(val.username).subscribe(result=>{
            if(result){
              this.selectedUser = result
              this.selectedUser = this.selectedUser.profile
              this.name1 = this.selectedUser.username
              if(this.selectedUser.following == true)
              {
                this.profileFollow = this.profileFollow ? false : true;

              }
            }
          })
        } else {
        }
    });
  }
  GetData(data:any){ 
    if(this.number == 2) {
      this.authService.showFavBlog(this.userName,data).subscribe(result=>{
        if(result){
          this.articleCount = (result.articlesCount/10)
          this.myInputMessage = this.articleCount
          this.selectedUserPost = result.articles
          this.condition = this.condition ? false : true;
          if(result.articlesCount == 0){
            this.favArticle = this.favArticle ? false : true;
          }
        }
      })
    } else {
      this.authService.getSelectedProfile(this.userName,data).subscribe(result=>{
        if(result){
          this.selectedUserPost = result.articles
          if(this.selectedUserPost[0].favorited == true){}
        }
      })
    }
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.userName = params.get("username")
    })

  this.token = localStorage.getItem("token");

  // this.authService.getUser().subscribe(result=>{
  //   alert("4")
  //   if(result){
  //     console.log(result)

  //     this.name = result.user.username
  //   }
  // })
  // if(this.userName){
  //   alert("5")
  //   this.authService.getSelectedProfile(this.userName).subscribe(result=>{
  //     if(result){
  //       console.log(result)
  //       console.log(this.profileFollow)

  //       this.selectedUserPost = result.articles
  //       if(this.selectedUserPost[0].favorited == true){
  //       }
  //     }
  //   })
  //   this.authService.getUserProfile(this.userName).subscribe(result=>{
  //     alert("6")
  //     if(result){
  //       console.log(result)
  //       this.selectedUser = result
  //       this.selectedUser = this.selectedUser.profile
  //       this.name1 = this.selectedUser.username
  //       console.log(this.profileFollow)
  //       if(this.selectedUser.following == true)
  //       {
  //         this.profileFollow = this.profileFollow ? false : true;
  //       }
  //     }
  //   })
  // } else {
  //   }
  }
  showFeed(blog:any)
  {
    this.userBlog = blog  
    this.authService.setData(this.userBlog)
    this.router.navigate(['/complete-article',this.userBlog.slug])
  }
  showProfile(blog:any) { 
    if(blog.author.username == this.data){
  } else {
      this.userBlog = blog
      // this.authService.setProfile1(this.userBlog)
      this.router.navigate(['/profile',this.userBlog.author.username])
    }
  }
  follow(data:any){
    if(this.token) {
      this.authService.follow(data.username).subscribe(result=>{
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
      this.authService.unFollow(data.username).subscribe(result=>{
        if(result){
          this.profileFollow = this.profileFollow ? false : true;
        }
      })
    } else {
    this.router.navigateByUrl('/login')
    }
  }
  showFavBlog(data:any,number:number){
    this.number = number
    this.authService.showFavBlog(data,'').subscribe(result=>{
      if(result){
        if(result.articlesCount == 0){
          if(this.favArticle == true){
          } else {
          this.favArticle = this.favArticle ? false : true;
          }
        } else {
          if(this.favArticle == false){
          } else{
          this.favArticle = this.favArticle ? false : true;
          }
        }
        this.articleCount = (result.articlesCount/10)
        this.myInputMessage = this.articleCount
        this.selectedUserPost = result.articles
        this.condition = this.condition ? false : true;
      }
    })
  }
  show(){
    if(this.favArticle == true){
      this.favArticle = this.favArticle ? false : true;
    }
    this.condition = this.condition ? false : true;
    if(this.userName) {
      this.authService.getSelectedProfile(this.userName,'').subscribe(result=>{
        if(result){
          this.articleCount = (result.articlesCount/10)
          this.myInputMessage = this.articleCount
          this.selectedUserPost = result.articles
          if(result.articlesCount == 0){
              this.favArticle = this.favArticle ? false : true;
            }
        }
      })
    } else {
      this.authService.getSelectedProfile(this.profile.author.username,'').subscribe(result=>{
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
            this.authService.showFavBlog(this.userName,'').subscribe(result=>{
              if(result){
                this.selectedUserPost = result.articles
                this.articleCount = (result.articlesCount/10)
                this.myInputMessage = this.articleCount
                if(result.articlesCount == 0){
                  this.favArticle = this.favArticle ? false : true;
                }
              }
            })
          }
        })
      }
    } else {
      this.router.navigateByUrl('/login')
    }
  }
  edit(){
    this.router.navigateByUrl('/settings')
  }
}
