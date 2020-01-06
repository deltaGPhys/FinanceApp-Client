import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService} from '../services/login.service';
import {CreateAccountService} from '../services/create-account.service'
import {User} from '../models/User';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private loginForm: FormGroup;
  private userEmail: string;
  private userPassword: string;
  private userEmails: any;
  private allEmails: string[] = [];
  myUser : User;
  notLoggedIn: boolean = true;

  public constructor(private loginService: LoginService, private userService: UserService, private createAccountService : CreateAccountService, private router : Router) {
    this.loginForm = this.createFormGroup();
    this.userEmails = this.createAccountService.getAllEmails()
    .subscribe(value => {this.allEmails = value; console.log(this.allEmails);});;
   }  
    

  ngOnInit() {
    
    
  }

  createFormGroup() {
    return new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
  });
  }

  revert() {
    this.loginForm.reset();
  }

  loginTest(): void {
    this.userService.updateLoginStatus(true);

  }
  
  onSubmit()  {
    this.userEmail = this.loginForm.controls.email.value;
    this.userPassword = this.loginForm.controls.password.value;

    if(this.validUserName(this.allEmails, this.userEmail)){
      this.loginService.verifyUser(this.userEmail,this.userPassword)
      .subscribe(data => {this.userService.updateLoginStatus(data); console.log(data)});
      
      this.router.navigate(['/accounts']);
    }
  
    // this.loginService.findUserByEmail(this.userEmail).pipe(delay(5000))
    // .subscribe(data => {this.myUser = data; console.log(data)});

    //this.loginService.verifyUser(email,password).subscribe(data => {this.loggedIn = data; console.log(this.loggedIn)});
    
    

    // if(loggedIn){

    // }

    
    // this.createAccountService.addUser(user)
    //   .subscribe(data => {this.user = data;});
      
    //   this.revert();

    //   this.router.navigate(['/accounts']);
    
  }
  validUserName (allEmails, userEmail) : boolean {
    for (let i = 0; i < allEmails.length; i++){
      if(userEmail === allEmails[i]){
        return true;
      }
    }
    return false;
  }

}
