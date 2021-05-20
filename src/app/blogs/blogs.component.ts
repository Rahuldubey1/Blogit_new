import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private authService:AuthServiceService) { }
  token:any
  userPost:any
  ngOnInit(): void {
    this.authService.getPost(this.token).subscribe(result=> {
      if(result && result.articles) {
        this.userPost = result.articles
        console.log(this.userPost)
      } else {
        alert("sdfg")
      }
    })
    this.token = localStorage.getItem("token");
  }
}
