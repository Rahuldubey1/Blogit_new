import { Component, OnInit,Input, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  @Input() myinputMsg:Number; 
  @Input() tags:string; 

  constructor(private authService:AuthServiceService,private router:Router) { }
  userPost:any
  userFeed:any
  token:any
  userBlog:any
  data:any
  liked:any
  class:boolean=false
  
  GetChildData(data:any){  
    console.log(data);  
  }
  ngOnChanges(): void{
    if(this.myinputMsg ==1 ){
      this.authService.getFeed(this.token).subscribe(result=> {
        if(result && result.articles) {
          this.userPost = result.articles
        }
      }) 
    }
    if(this.myinputMsg ==2 ) {
      this.authService.getPost(this.token).subscribe(result=> {
        if(result && result.articles) {
          this.userPost = result.articles
        } else {
          alert("There is error")
        }
      })     
    }
    if(this.myinputMsg ==3) {
      this.authService.getFilteredBlog(this.tags).subscribe(result=>{
        if(result){
          this.userPost=result.articles
        }
    })
  }
}
  ngOnInit(): void {
      this.token = localStorage.getItem("token");
      this.authService.getFeed(this.token).subscribe(result=> {
        if(result && result.articles) {
          this.userPost = result.articles
          if(this.userPost.favorited == true){
            this.class = this.class? false : true;
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
  showProfile(blog:any)
  {
    this.userBlog = blog
    console.log(this.userBlog,"hhhh")
    this.authService.setProfile1(this.userBlog)
    this.router.navigateByUrl('/profile')
  }
//   like() {
//     this.authService.addLike(this.showBlogs.slug).subscribe(result=> {
//     if(result){
//       alert("You have liked this article")
//     }
//   })
// }
like(blog:any) {
  if(blog.favorited == false) {
  this.authService.addLike(blog.slug).subscribe(result=> {
    if(result){
      blog.favoritesCount = blog.favoritesCount + 1
      blog.favorited = true
      this.class = this.class? false : true;
    }
  })
}
else {
  this.authService.removeLike(blog.slug).subscribe(result=> {
    if(result){
      blog.favoritesCount = blog.favoritesCount - 1
      blog.favorited = false
      this.class = this.class? false : true;
    }
  })
}
}
}
