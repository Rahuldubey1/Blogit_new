import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-complete-article',
  templateUrl: './complete-article.component.html',
  styleUrls: ['./complete-article.component.css']
})
export class CompleteArticleComponent implements OnInit {
  data:any
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
  this.data = this.authService.getData()
  console.log(this.data) 
  }
  
  

}
