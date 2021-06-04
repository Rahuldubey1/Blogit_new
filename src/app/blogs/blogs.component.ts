import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {  
  re = new RegExp(/[\u200B-\u200D\uFEFF]/g);
  editArticle1:FormGroup;
  selectedTab:Number
  constructor(private authService:AuthServiceService, private router:Router) { }

  tagList:any=[]
  token:any
  userPost:any
  visible:boolean = false
  userFeed:any
  showMainContent:boolean = false
  showBlogs:any  
  showEditContent:boolean = false
  showNewContent:boolean = false
  comments:any
  addArticle1:any
  condition:number = 2
  filteredPost:any
  filter:boolean = false
  save:any
  list1:any=[]
  list:any=[]
  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    if(this.token){
      this.condition = 1
    }
    // this.authService.getPost(this.token).subscribe(result=> {
    //   console.log(result)
    //   if(result && result.articles) {
    //     this.userPost = result.articles
    //     // console.log(this.userPost)
    //   } else {
    //     alert("There is error")
    //   }
    // })
    // this.authService.getFeed(this.token).subscribe(result=> {
    //   // console.log(result)
    //   if(result && result.articles) {
    //     this.userFeed = result.articles
    //   }
    // })
    this.authService.getTag().subscribe(result=> {
      if(result){
        this.tagList = result
        this.tagList = this.tagList["tags"]        
        for(var tag of this.tagList){
          this.list1 = tag.replace(this.re, '')
          if(this.list1.length>0){
            this.list.push(this.list1)
          }
        }
      }
    })
  }
  

  
  checkBlogs(tab:Number){
    if(tab == 1) { 
      this.filter = false
      this.condition = 1
    }
    if(tab == 2) {
      this.filter = false
      this.condition = 2
    }
    if(this.token) {
      this.selectedTab = tab 
     
    }
    else {
      this.router.navigateByUrl('/login')
    }
  
  }
  complete_blog(blog:any) {
    this.showBlogs = blog
    // console.log(this.showBlogs.tagList)

    this.showMainContent = this.showMainContent ? false : true;
   }
   editArticle(){
    this.showEditContent = this.showEditContent ? false : true;
  }
  edit(values:any){
    console.log(values)
  }
  blogHome(){
    this.showMainContent = this.showMainContent ? false : true;
  }
  addComment(comment:any){
    var data = {
      body:comment,
      slug: this.showBlogs.slug,
      token: this.token
    }
    this.authService.addComment(data).subscribe(result=> {
      if(result){
        this.comments=result
        // console.log(this.comments.comment.body)
      }
    })

  }  
  newArticle(){
    this.showNewContent = this.showNewContent ? false : true;
    
  }
  filterBlogs(tag:any){
    this.selectedTab = 3
      this.save=tag
    if(this.filter == false){
    this.filter = this.filter ? false : true;
  }
    this.condition = 3
  }
  onSubmit(){
    // var data = {
    //   title: this.editArticle1.title,
    //   description: this.editArticle1.description,
    //   body: this.editArticle1.body
    // }
    // console.log(this.editArticle1.value)
    this.authService.updateArticle(this.editArticle1.value).subscribe(result=> {
      console.log(result)
      console.log("vbnm")
    })
  }
  onSubmit1(){
    this.authService.addArticle(this.addArticle1.value).subscribe(result=> {
    console.log(result)
    })
  }
  like() {
      this.authService.addLike(this.showBlogs.slug).subscribe(result=> {
      if(result){
        alert("You have liked this article")
      }
    })
  }
}