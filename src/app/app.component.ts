import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from './services/user-service.service'
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'FinanceApp';
  isLoggedIn: boolean;
  

  constructor(private loginService: LoginService) {
    this.loginService.isLoggedIn.subscribe(data => this.isLoggedIn = data);
  }

  ngOnInit() {
      
      
  }
}
