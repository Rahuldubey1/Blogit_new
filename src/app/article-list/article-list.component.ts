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
  option:boolean = false
  show:boolean = false
  
  GetChildData(data:any){  
    console.log(data);  
  }
  ngOnChanges(): void{
    if(this.myinputMsg ==1 ){
      this.authService.getFeed(this.token).subscribe(result=> {
        if(result && result.articles) {
          if(result.articlesCount == 0){
            this.show = this.show ? false:true
          }
          this.userPost = result.articles 
        }
      }) 
    }
    if(this.myinputMsg ==2 ) {
      this.authService.getPost().subscribe(result=> {
        if(result && result.articles) {
          if(result.articlesCount == 0){
            this.show = this.show ? false:true
          }
          this.userPost = result.articles
          this.show = this.show ? false:true
        } else {
          alert("There is error")
        }
      })     
    }
    if(this.myinputMsg ==3) {
      this.authService.getFilteredBlog(this.tags).subscribe(result=>{
        if(result){
          if(result.articlesCount == 0){
            this.show = this.show ? false:true
          }
          this.userPost=result.articles
        }
    })
  }
}
  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    if(!this.token){
      this.authService.getPost().subscribe(result=> {
        if(result && result.articles) {
          this.userPost = result.articles
        } else {
          alert("There is error")
        }
      })
    } else {
      this.authService.getFeed(this.token).subscribe(result=> {
        if(result && result.articles) {
          if(result.articlesCount == 0){
            this.show = this.show ? false:true
          }
          this.userPost = result.articles          
        }
      }) 
    }
  }

  showFeed(blog:any)
  {
    this.userBlog = blog  
    this.authService.setData(this.userBlog)
    console.log(this.userBlog)
    this.router.navigate(['/complete-article', blog.slug])
  }
  showProfile(blog:any)
  {
    this.userBlog = blog.author.username
    // console.log(this.userBlog.author.username)
    // this.authService.setProfile1(this.userBlog)
    this.router.navigate(['/profile', blog.author.username]);
  }
  like(blog:any,i:any) {
    if(this.token) {
      if(blog.favorited == false) {
        this.authService.addLike(blog.slug).subscribe(result=> {
          if(result){
            blog.favoritesCount = blog.favoritesCount + 1
            blog.favorited = true
            this.option = this.option ? false:true
          }
        })
      }
      else {
        this.authService.removeLike(blog.slug).subscribe(result=> {
          if(result){
            blog.favoritesCount = blog.favoritesCount - 1
            blog.favorited = false
            this.option = this.option ? false:true
            
          }
        })
      }
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }
}
