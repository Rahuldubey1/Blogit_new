import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private authService:AuthServiceService, private router:Router) { }
  token:any
  userPost:any
  visible:boolean = false
  userFeed:any
  showMainContent:boolean = false
  showBlogs:any  
  showEditContent:boolean = false

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.authService.getPost(this.token).subscribe(result=> {
      console.log(result)
      if(result && result.articles) {
        this.userPost = result.articles
        console.log(this.userPost)
      } else {
        alert("sdfg")
      }
    })
    // this.authService.getFeed(this.token).subscribe(result=> {
    //   if(result && result.articles) {
    //     this.userFeed = result.articles
    //     console.log(this.userFeed)
    //   }
    // })
    
    
  }
  checkBlogs(){
    if(this.token){
      this.visible = !this.visible
    }
    else {
      this.router.navigateByUrl('/login')
    }
  }
  complete_blog(blog:any) {
    this.showBlogs = blog
    console.log(this.showBlogs.tagList)

    this.showMainContent = this.showMainContent ? false : true;
   }
   editArticle(){
    this.showEditContent = this.showEditContent ? false : true;

   }
}
