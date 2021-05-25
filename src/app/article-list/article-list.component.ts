import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  constructor(private authService:AuthServiceService,private router:Router) { }
  userPost:any
  userFeed:any
  token:any
  userBlog:any
  data:any
  

  ngOnInit(): void {
    console.log(this.data)
    this.token = localStorage.getItem("token");
    this.authService.getPost(this.token).subscribe(result=> {
      if(result && result.articles) {
        this.userPost = result.articles
      } else {
        alert("There is error")
      }
    })
    this.authService.getFeed(this.token).subscribe(result=> {
      if(result && result.articles) {
        this.userFeed = result.articles
      }
    })
  }

  showFeed(blog:any)
  {
    this.data= this.authService.getValue()
    this.userBlog = blog  
    this.authService.setData(this.userBlog)
    // this.router.navigateByUrl('/complete-article')
  }
}
