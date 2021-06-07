import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute} from '@angular/router'
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
  userName:any
  constructor(private authService:AuthServiceService,private router:Router,private route:ActivatedRoute) { }

  // ngOnChanges(): void{
  //   this.authService.getComment(this.data.slug).subscribe(result=> {
  //     if(result){
  //       this.comm=result
  //       this.comments = this.comm.comments
  //     }
  //   })  
  // }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userName = params.get("username")
   })
   console.log(this.userName)
  this.token = localStorage.getItem("token");
  // this.data = this.authService.getData()
  // console.log(this.data)\
  this.authService.getclickedBlog(this.userName).subscribe(result=>{
    if(result){
      this.data = result
      this.data=this.data.article
      console.log(this.data)
    }
  })
  this.authService.getUser().subscribe(result=> {
    if(result){
      this.userProfile = result.user
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
        this.commentss = ''
      }
    })
      

  } 
  deleteComment(data:any,id:number){
    var value={
      id:data.id,
      slug:this.data.slug
    }
    this.authService.deleteComment(value).subscribe(result=> {
      if(result){
      }
    })
    console.log(this.comments.indexOf('id'))
    this.comments = this.comments.filter((v:any,i:any) => i !== id); 
    console.log(id,"hi")
    
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
    // console.log(blog)
    // this.userData = blog
    // this.authService.setProfile2(this.userData)
    this.router.navigate(['/profile', blog.author.username]);

    // this.router.navigateByUrl('/profile')
  }
}