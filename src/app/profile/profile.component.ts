import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data:any
  profileFollow:boolean = false
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
  this.data = this.authService.getProfile()
    console.log(this.data,"data")
  }
  follow(data:any){
    this.authService.follow(data.username).subscribe(result=>{
      if(result){
        console.log(this.profileFollow)
        this.profileFollow = this.profileFollow ? false : true;
        console.log(this.profileFollow)
      }
    })
  }

}
