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
  @Input() filterPost:number;

  constructor(private authService:AuthServiceService,private router:Router) { }
  userPost:any
  userFeed:any
  token:any
  userBlog:any
  data:any
  liked:any
  option:boolean = false
  show:boolean = false
  articleCount:any
  myInputMessage:any
  article:any=[]
  value:any = 0
  filter:any
  length:number
  
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  GetData(data:any){    
    this.authService.getFeed(this.token,data).subscribe(result=> {
      if(result && result.articles) {
        this.articleCount = (result.articlesCount/10)
        if(result.articlesCount == 0){
          this.show = this.show ? false:true
        }
        this.userPost = result.articles          
      }
      for (let i = 0; i < this.articleCount; i++) {
        this.article.push(i)
      }
    }) 
  }
  GetChildData(data:any){  
    console.log(data);  
  }
  ngOnChanges(): void{
    if(this.myinputMsg ==1 ){
      this.authService.getFeed(this.token,this.filterPost).subscribe(result=> {
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
  if(this.filterPost != undefined){
    this.authService.getFeed(this.token,this.filterPost).subscribe(result=> {
      if(result && result.articles) {
        this.articleCount = (result.articlesCount/this.filterPost)
        this.myInputMessage = this.articleCount
        if(result.articlesCount == 0){
          this.show = this.show ? false:true
        }
        this.userPost = result.articles 
      } this. article = []
      for (let i = 0; i < this.articleCount; i++) { 
        this.article.push(i)

      }
      this.length = this.article.length
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
      this.authService.getFeed(this.token,this.filterPost).subscribe(result=> {
        if(result && result.articles) {
          this.articleCount = (result.articlesCount/10)
          this.myInputMessage = this.articleCount
          if(result.articlesCount == 0){
            this.show = this.show ? false:true
          }
          this.userPost = result.articles          
        }
        for (let i = 0; i < this.articleCount; i++) {
          this.article.push(i)
        }
        this.length = this.article.length
        this.allItems = result.articles;
        console.log(this.allItems)
        this.setPage(1);
      }) 
    }
  }
  setPage(page: number) {
    alert(page)
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.authService.getPager(this.allItems.length, page);
    console.log(this.pager,"d")
    console.log(this.pager.pages.length)
    console.log(this.pager.currentPage)

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
  showFeed(blog:any)    
  {
    this.userBlog = blog  
    this.authService.setData(this.userBlog)
    this.router.navigate(['/complete-article', blog.slug])
  }
  showProfile(blog:any)
  {
    this.userBlog = blog.author.username
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
  pagination(number:number){
    this.value = number
    this.authService.getFeed(this.token,number).subscribe(result=> {
      if(result && result.articles) {
        if(result.articlesCount == 0){
          this.show = this.show ? false:true

        }
        this.userPost = result.articles          
      }
    }) 
  }
  pervious(){
    if(this.value == 0){
      alert("hello")
    }
    else {
    this.value = this.value-1
    }
    this.authService.getFeed(this.token,this.value).subscribe(result=> {
      if(result && result.articles) {
        if(result.articlesCount == 0){
          this.show = this.show ? false:true
        }
        this.userPost = result.articles          
      }
    }) 
  }
  next(){
    this.value = this.value+1
    this.authService.getFeed(this.token,this.value).subscribe(result=> {
      if(result && result.articles) {
        if(result.articlesCount == 0){
          this.show = this.show ? false:true
        }
        this.userPost = result.articles          
      }
    }) 

  }
   
}
