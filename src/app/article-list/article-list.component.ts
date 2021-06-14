import { Component, OnInit,Input, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'
import { identity } from 'underscore';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  @Input() myinputMsg:Number; 
  @Input() tags:string; 
  @Input() filterPost:number = 10;

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
    
    if(!this.token){
      this.authService.getPost(data).subscribe(result=> {
        if(result && result.articles) {
          this.userPost = result.articles
        } else {
          alert("There is error")
        }
      })
    }
    if (this.myinputMsg ==2){
      console.log(data) 

    this.authService.getPost(data).subscribe(result=> {
      console.log(data)
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
   else if (this.myinputMsg == 3) {
    this.authService.getFilteredBlog(this.tags,data).subscribe(result=>{
      if(result){
        if(result.articlesCount == 0) {
          this.show = this.show ? false:true
        }
        if(this.filterPost == undefined){
          this.filterPost = 10 
        }
        this.articleCount = (result.articlesCount/this.filterPost)
        this.myInputMessage = this.articleCount
        this.userPost=result.articles
      }
    })
  } else {
    if(this.token){
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
  }
}
  GetChildData(data:any){  
    console.log(data);  
  }
  ngOnChanges(): void{
    if(this.filterPost){
      if(this.token){
        if(this.myinputMsg == undefined){
          this.myinputMsg = 1
        }
      }
      if(this.myinputMsg ==1 ){
        this.authService.getFeed(this.token,this.filterPost).subscribe(result=> {
          if(result && result.articles) {
            if(result.articlesCount == 0){
              this.show = this.show ? false:true 
            }
            if(this.filterPost == undefined){
              this.filterPost = 10 
            }
            this.articleCount = (result.articlesCount/this.filterPost)
            this.myInputMessage = this.articleCount
            this.userPost = result.articles 
          }
        }) 
      } 
      if(!this.token){
        if(this.myinputMsg == undefined){
          this.myinputMsg = 2
        }
      }
      if(this.myinputMsg ==2)  {
        this.authService.getPost(this.filterPost).subscribe(result=> {
          if(result && result.articles) {
            if(result.articlesCount == 0){
              this.show = this.show ? false:true
          }
            if(this.filterPost == undefined){
              this.filterPost = 10 
            }
            this.articleCount = (result.articlesCount/this.filterPost)
            this.myInputMessage = this.articleCount
            this.userPost = result.articles 
              if(this.articleCount == 0){
                this.show = this.show ? false:true
              }
          } else {
            alert("There is error")
          }
        })     
      }
      if(this.myinputMsg ==3) {

        this.authService.getFilteredBlog(this.tags,this.filterPost).subscribe(result=>{
          if(result){
            if(result.articlesCount == 0){
              this.show = this.show ? false:true
            }
            if(this.filterPost == undefined){
              this.filterPost = 10 
            }
            this.articleCount = (result.articlesCount/this.filterPost)
            this.myInputMessage = this.articleCount
            this.userPost=result.articles
          }
        })
      }
    } else {
      if(this.myinputMsg ==1 ){
        this.authService.getFeed(this.token,this.filterPost).subscribe(result=> {
          if(result && result.articles) {
            if(result.articlesCount == 0){
              this.show = this.show ? false:true
            }
            this.articleCount = (result.articlesCount/10)
            this.myInputMessage = this.articleCount
            this.userPost = result.articles 
          }
        }) 
      } 
      if(this.myinputMsg ==2)  {
        this.authService.getPost(this.filterPost).subscribe(result=> {
          if(this.show == true){
            this.show = this.show ? false:true
          }
          if(result && result.articles) {
            if(result.articlesCount == 0){
              if(this.show == true){
              } else {
              this.show = this.show ? false:true
              }
            }
            this.articleCount = (result.articlesCount/10)
            this.myInputMessage = this.articleCount
            this.userPost = result.articles 
              if(this.articleCount == 0){
                this.show = this.show ? false:true
              }
          } else {
            alert("There is error")
          }
        })     
      }
      if(this.myinputMsg ==3) {
        this.authService.getFilteredBlog(this.tags,this.filterPost).subscribe(result=>{
      if(this.show == true){
        this.show = this.show ? false:true
      }
      if(result && result.articles) {
        if(result.articlesCount == 0){
          if(this.show == true){
          } else {
          this.show = this.show ? false:true
          }
        }
            this.articleCount = (result.articlesCount/10)
            this.myInputMessage = this.articleCount
            this.userPost=result.articles
          }
      })
    }
  }
  // if(this.myinputMsg ==3 || this.myinputMsg ==1 || this.myinputMsg ==2 ) {
  //   alert("9")

  // if(this.filterPost == undefined){
  //   alert("10")

  //   this.authService.getFeed(this.token,this.filterPost).subscribe(result=> {
  //     if(result && result.articles) {
  //       this.articleCount = (result.articlesCount/this.filterPost)
  //       this.myInputMessage = this.articleCount
  //       if(result.articlesCount == 0){
  //         this.show = this.show ? false:true
  //       }
  //       this.userPost = result.articles 
  //     } this. article = []
  //     for (let i = 0; i < this.articleCount; i++) { 
  //       this.article.push(i)

  //     }
  //     this.length = this.article.length
  //   }) 
  // }

}
  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    if(!this.token){
      this.authService.getPost('').subscribe(result=> {
        if(result && result.articles) {
          this.userPost = result.articles
          this.articleCount = (result.articlesCount/10)
          this.myInputMessage = this.articleCount
        } else {
          alert("There is error")
        }
      })
    } else {
      if(this.token){
        this.authService.getFeed(this.token,this.filterPost).subscribe(result=> {
          if(result && result.articles) {
          this.articleCount = (result.articlesCount/10)
          this.myInputMessage = this.articleCount
          if(result.articlesCount == 0){console.log(this.show)
            this.show = this.show ? false:true
            console.log(this.show)
          }
          this.userPost = result.articles          
        }
        for (let i = 0; i < this.articleCount; i++) {
          this.article.push(i)
        }
        this.length = this.article.length
      }) 
    }
  }
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
  // pagination(number:number){
  //   this.value = number
  //   this.authService.getFeed(this.token,number).subscribe(result=> {
  //     if(result && result.articles) {
  //       if(result.articlesCount == 0){
  //         this.show = this.show ? false:true

  //       }
  //       this.userPost = result.articles          
  //     }
  //   }) 
  // }
  // pervious(){
  //   if(this.value == 0){
  //   }
  //   else {
  //   this.value = this.value-1
  //   }
  //   this.authService.getFeed(this.token,this.value).subscribe(result=> {
  //     if(result && result.articles) {
  //       if(result.articlesCount == 0){
  //         this.show = this.show ? false:true
  //       }
  //       this.userPost = result.articles          
  //     }
  //   }) 
  // }
  // next(){
  //   this.value = this.value+1
  //   this.authService.getFeed(this.token,this.value).subscribe(result=> {
  //     if(result && result.articles) {
  //       if(result.articlesCount == 0){
  //         this.show = this.show ? false:true
  //       }
  //       this.userPost = result.articles          
  //     }
  //   }) 

  // }
   
}
