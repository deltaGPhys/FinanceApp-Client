import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService} from 'src/app/services/login.service';
import {CreateAccountService} from '../../services/create-account.service'
import {User} from '../../models/User';
import { Router } from '@angular/router';
import { delay, subscribeOn } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserService } from '../../services/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private loginForm: FormGroup;
  public userEmail: string;
  private userPassword: string;
  private userEmails: any;
  private allEmails: string[] = [];
  myUser : User;
  invalidLogin: boolean = false;
  //notLoggedIn: boolean = true;

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
    console.log(this.userEmail);
    console.log(this.userPassword);
    if(this.validUserName(this.allEmails, this.userEmail)){
      this.loginService.verifyUser(this.userEmail,this.userPassword)
          .subscribe(data => {this.userService.updateLoginStatus(data); console.log(data);});
      this.loginService.findUserByEmail(this.userEmail)
          .subscribe(info =>{this.myUser = info; console.log("Saved User: " + this.myUser);});
      
    

      this.router.navigate(['/accounts']);

      //this.loggedIn=true;
    }
    else {
      this.invalidLogin = true;
      this.router.navigate(['']);
    }
  }
  validUserName (allEmails, userEmail) : boolean {
    for (let i = 0; i < allEmails.length; i++){
      if(userEmail === allEmails[i]){
        return true;
      }
    }
    return false;
  }

  // static getUser() {
  //   const myUser = this.loginForm.controls.email.value;
  //   return [myUser];
  //  }

}
