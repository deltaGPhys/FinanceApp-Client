import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  
  private currentUser: User;

  constructor(private userService: UserService) { 
    this.userService.currentUser$.subscribe(data => this.currentUser = data);
  }

  ngOnInit() {
  }

  
}
