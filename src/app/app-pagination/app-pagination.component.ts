import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-app-pagination',
  templateUrl: './app-pagination.component.html',
  styleUrls: ['./app-pagination.component.css']
})
export class AppPaginationComponent implements OnInit,OnChanges {
  @Input() myinputMsg:any;
  @Output() myOutput:EventEmitter<any>= new EventEmitter();
  article:any = []
  value:any = 0
  token:any
  num:number
  constructor(private authService:AuthServiceService) { }
  ngOnChanges(){ 
    this.article = []
      for (let i = 0; i < this.myinputMsg; i++) { 
        this.article.push(i)
    }
    this.value = 0
    alert("value")
    console.log(this.value)
  }
  ngOnInit(): void {
    alert("123")
    this.token = this.authService.getToken()
  }
  pagination(number:any){
    alert("bnm")
    this.myOutput.emit(number)
    this.value = number 
    console.log(this.value)
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  pervious(){
    if(this.value == 0){
      // (<HTMLInputElement> document.getElementById("pervious")).disabled = true;
    }
    else {
    this.value = this.value-1
    }
    this.myOutput.emit(this.value)
  }
  next(){
    this.value = this.value+1
    this.myOutput.emit(this.value)
  }
}
