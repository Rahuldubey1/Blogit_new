import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-app-pagination',
  templateUrl: './app-pagination.component.html',
  styleUrls: ['./app-pagination.component.css']
})
export class AppPaginationComponent implements OnInit,OnChanges {
  @Input() myinputMsg:any;
  article:any
  constructor(private authService:AuthServiceService) { }
  ngOnChanges(){
    
    for (let i = 0; i < this.myinputMsg; i++) {
      this.article.push(i)
      }
    console.log(this.article)
  }
  ngOnInit(): void {
    

  }
  

}
