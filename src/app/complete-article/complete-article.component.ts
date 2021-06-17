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
  name:any
  constructor(private authService:AuthServiceService,private router:Router,private route:ActivatedRoute) { }
  
  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userName = params.get("username")
    })
    this.authService.getComment(this.userName).subscribe(result=> {
      if(result){
        this.comm=result
        this.comments = this.comm.comments
      }
    })
    this.token = localStorage.getItem("token");
    const response = await this.authService.getclickedBlog(this.userName).subscribe(result=>{
        if(result) {
        this.data = result
        this.data=this.data.article
        this.name=this.data.author.username
      }
      if(this.data.author.following == true) {
        this.profileFollow = this.profileFollow ? false : true;
      }
      if(this.data.favorited == true) {
        this.articleLike = this.articleLike ? false : true;
      }
    })
    this.authService.getUser().subscribe(result=> {
      if(result){
        this.userProfile = result.user
      }
      if(this.userProfile.username == this.name) {
        this.profile = this.profile? false:true
      }  
    })
    if(this.data.author.following == true) {
      this.profileFollow = this.profileFollow ? false : true;
    }    
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
    this.comments = this.comments.filter((v:any,i:any) => i !== id); 
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
            this.data = result
            this.data=this.data.article
            this.articleLike = true
          }
        })
      }
      else {
        this.authService.removeLike(blog.slug).subscribe(result=> {
          if(result){
            this.data = result
            this.data=this.data.article
            this.articleLike = false
          }
        })
      } 
    } else {
        this.router.navigateByUrl('/login')
    }
  }
  showProfile(blog:any) {
    this.router.navigate(['/profile', blog.author.username]);
  }
}