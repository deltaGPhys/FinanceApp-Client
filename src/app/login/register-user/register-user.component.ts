import { Component, OnInit} from '@angular/core';
import{User} from '../../models/User';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CreateAccountService } from 'src/app/services/create-account.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  private userEmails: any;
  userCheck: any;
  private user: User;
  allEmails: string[] = [];
  createUserForm: FormGroup;
  private userEmail: string = "";
  emailAlreadyTaken : boolean = false;
 
  constructor(private createAccountService: CreateAccountService, private router: Router, private userService: UserService) { 
    this.createUserForm = this.createFormGroup();
  }

  ngOnInit() {
    
  }

  createFormGroup() {
    return new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        email: new FormControl('', [Validators.required,  Validators.email]),
        password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]),
        rent: new FormControl('', [Validators.required, Validators.pattern('^[0-9.]+$')]),
        salary: new FormControl('', [Validators.required, Validators.pattern('^[0-9.]+$')])
  });
  }

  revert() {
    this.createUserForm.reset();
  }

  get firstName() {
    return this.createUserForm.get('firstName');
  } 

  get lastName() {
    return this.createUserForm.get('lastName');
  } 

  get email() {
    return this.createUserForm.get('email');
  } 

  get password() {
    return this.createUserForm.get('password');
  } 

  onSubmit() {
    
    this.userEmail = this.createUserForm.controls.email.value;
    console.log(this.userEmail);
    this.userService.checkEmailAvailability(this.userEmail).subscribe(data => {
      console.log("taken: ", data);
      if(data){
        this.emailAlreadyTaken = false;
        let user: User = new User (
          null,
          this.createUserForm.controls.firstName.value,
          this.createUserForm.controls.lastName.value,
          this.createUserForm.controls.email.value,
          this.createUserForm.controls.password.value,
          this.createUserForm.controls.rent.value,
          this.createUserForm.controls.salary.value
          );
      
        this.createAccountService.addUser(user)
          .subscribe(data => {
            this.user = data;
            this.userService.updateCurrentUser(this.user);
            this.revert();
            this.router.navigate(['/investments']);
            }
          );
      } else {
          this.emailAlreadyTaken = true;
      }
    });
  }
}
