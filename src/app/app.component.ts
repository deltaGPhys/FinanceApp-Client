import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './models/User';



@Component({
  selector: 'app-root',
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'ZipWire';
  currentUser: User;
  

  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe(data => {this.currentUser = data; console.log("user:",data);});
  }

  ngOnInit() {
      
      
  }
}
