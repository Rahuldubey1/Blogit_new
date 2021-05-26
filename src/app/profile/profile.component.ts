import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data:any
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
  this.data = this.authService.getProfile()
    console.log(this.data,"data")
  }

}
