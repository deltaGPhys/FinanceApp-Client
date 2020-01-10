import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { delay, subscribeOn } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { PriceHistory } from 'src/app/models/PriceHistory';
import { CreateAccountService } from 'src/app/services/create-account.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  public userEmail: string;
  private userPassword: string;
  myUser : User;
  invalidLogin: boolean = false;

  public constructor(private userService: UserService, private createAccountService : CreateAccountService, private router : Router) {
    this.loginForm = this.createFormGroup();
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
  
  onSubmit()  {
    this.userEmail = this.loginForm.controls.email.value;
    this.userPassword = this.loginForm.controls.password.value;
     console.log(this.userEmail);
     console.log(this.userPassword);
    
    this.userService.verifyUser(this.userEmail,this.userPassword)
        .subscribe(data => {this.userService.updateCurrentUser(data);
          console.log("user" , data);
          this.router.navigate(['/accounts']);
          //   this.router.navigate(['/investments']);
          // if (data == null) {
          //   this.invalidLogin = true;
          //   this.revert();
          // } else {
          //   this.userService.updateCurrentUser(data);
          //   
          // }
        });
    
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
