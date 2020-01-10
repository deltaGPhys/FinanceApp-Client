import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { InvestmentService } from 'src/app/services/investment.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  updateUser : boolean = false;
  currentUser: User;

  constructor(private userService: UserService, private router: Router, private investmentService: InvestmentService) { 
    this.userService.currentUser$.subscribe(data => this.currentUser = data);
    
  }

  ngOnInit() {
  }

  displayEdit() : void {
    this.router.navigate(['/update-user']);
  }

  toggleDisplay(view: string) {
    this.investmentService.toggleDisplay(view);
  }
  
}
