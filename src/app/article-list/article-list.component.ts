import { Component, OnInit,Input} from '@angular/core';
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

  constructor(private authService:AuthServiceService,private router:Router) { }
  userPost:any
  userFeed:any
  token:any
  userBlog:any
  data:any
  
  
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
  }
  ngOnInit(): void {
      this.token = localStorage.getItem("token");
      this.authService.getPost(this.token).subscribe(result=> {
          if(result && result.articles) {
            this.userPost = result.articles
          } else {
            alert("There is error")
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
    this.authService.setProfile(this.userBlog)
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
  this.authService.addLike(blog.slug).subscribe(result=> {
  if(result){
    console.log(result)
    alert("You have liked this article")
  }
})
}
}
