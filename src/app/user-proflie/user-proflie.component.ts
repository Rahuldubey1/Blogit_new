import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute} from '@angular/router'

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
  constructor(private authService:AuthServiceService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.data = params.get("username")
   })
    this.authService.getSelectedProfile(this.data,'').subscribe(result=>{
      if(result){
        if(result.articlesCount == 0){
          this.favArticle = this.favArticle ? false : true;
        }
        else{
        this.selectedUserPost = result.articles
        }
      }
    })
  }
  showFeed(blog:any) {
    this.userBlog = blog  
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
  showFavBlog(data:any){
    this.authService.showFavBlog(data,'').subscribe(result=>{
      if(result){
        if(result.articlesCount == 0){
            if(this.favArticle == false){
              this.favArticle = this.favArticle ? false : true;
              this.condition = this.condition ? false : true;
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
      this.favArticle = this.favArticle ? false : true;
    }
    this.condition = this.condition ? false : true;
    this.authService.getSelectedProfile(this.data,'').subscribe(result=>{
      if(result){
        this.selectedUserPost = result.articles
        if(result.articlesCount == 0){
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