import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  comm:any
  userProfile:any
  profile:boolean = false
  userData:any
  constructor(private authService:AuthServiceService,private router:Router) { }

  // ngOnChanges(): void{
  //   this.authService.getComment(this.data.slug).subscribe(result=> {
  //     if(result){
  //       this.comm=result
  //       this.comments = this.comm.comments
  //     }
  //   })  
  // }
  
  ngOnInit(): void {

  this.token = localStorage.getItem("token");
  this.data = this.authService.getData()
  this.authService.getUser(this.token).subscribe(result=> {
    if(result){
      this.userProfile = result
      console.log(this.userProfile)
    }
    if(this.userProfile.user.username == this.data.author.username) {
      this.profile = this.profile? false:true
    }  
})
  
  if(this.data.author.following == true)
  {
    this.profileFollow = this.profileFollow ? false : true;
  }

  if(this.data.favorited == true)
  {
    this.articleLike = this.articleLike ? false : true;
  }
  this.authService.getComment(this.data.slug).subscribe(result=> {
    if(result){
      this.comm=result
      this.comments = this.comm.comments
    }
  })
}
delete(data:any){
  var value={
    slug:data.slug
  }
  this.authService.deleteArticle(value).subscribe(result=> {
  if(result){
    this.router.navigateByUrl('/user-profile')
  }
  })
}
editArticle(data:any){
  this.authService.setEditData(data)
  this.router.navigateByUrl('/new-article')
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
  deleteComment(data:any){
    var value={
      id:data.id,
      slug:this.data.slug
    }
    console.log(value)
    this.authService.deleteComment(value).subscribe(result=> {
      if(result){
        
        // console.log(this.comments.id)
        // this.comments.slice(value.id)        
        // console.log(this.comments)
                
      }
    })
    
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
    if(this.token){
      this.authService.unFollow(data.author.username).subscribe(result=>{
        if(result){
          this.profileFollow = this.profileFollow ? false : true;
        }
      })
    } else {
    this.router.navigateByUrl('/login')
    }
  }
  like(blog:any) {
    if(this.token) {
      if(blog.favorited == false) {
        this.authService.addLike(blog.slug).subscribe(result=> {
          if(result){
            this.articleLike = true
          }
        })
      }
      else {
        this.authService.removeLike(blog.slug).subscribe(result=> {
          if(result){
            this.articleLike = false
          }
        })
      } 
    } else {
        this.router.navigateByUrl('/login')
    }
  }
  showProfile(blog:any) {
    this.userData = blog
    this.authService.setProfile2(this.userData)
    this.router.navigateByUrl('/profile')
  }
}