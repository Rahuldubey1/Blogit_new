import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(result=>{
      
    })
    
  }


}
