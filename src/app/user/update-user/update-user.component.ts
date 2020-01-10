import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvestmentService } from 'src/app/services/investment.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  currentUser: User;
  updateUserForm: FormGroup;
  private userEmail: string = "";
  private userFirstName: string = "";
  private userLastName: string = "";
  user: User;
  emailAlreadyTaken : boolean = false;
  firstNameEmpty : boolean = false;
  lastNameEmpty : boolean = false;
  emailEmpty : boolean = false;


  constructor(private userService : UserService, private router : Router, private investmentService: InvestmentService) {
    this.userService.currentUser$.subscribe(data => {this.currentUser = data; console.log(this.currentUser);});
    this.updateUserForm = this.createFormGroup();
   }
  
  ngOnInit() {
  }

  createFormGroup() {
    return new FormGroup({  
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required,  Validators.email])
      //password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]),      
    });
  }

  get firstName() {
    return this.updateUserForm.get('firstName');
  } 

  get lastName() {
    return this.updateUserForm.get('lastName');
  } 

  get email() {
    return this.updateUserForm.get('email');
  } 

  submit(): void {
    this.userEmail = this.updateUserForm.controls.email.value;
    console.log(this.userEmail);
    this.userService.checkEmailAvailability(this.userEmail).subscribe(data => {
       console.log("taken: ", data);
    if(this.userEmail === this.currentUser.email){
      data = true;
    }
    if(data) {
    console.log("inside submit");
    this.emailAlreadyTaken = false;
    this.userFirstName = this.updateUserForm.controls.firstName.value;
    this.userLastName = this.updateUserForm.controls.lastName.value;
    this.currentUser.firstName = this.userFirstName;
    this.currentUser.lastName = this.userLastName;
    this.currentUser.email = this.userEmail;
    console.log(this.currentUser);
    this.userService.updateUserProfile(this.currentUser)
      .subscribe(data => {
        this.user = data;
        this.userService.updateCurrentUser(this.user);
        this.updateUserForm.reset();
        console.log("User: " , this.user);
        this.toggleDisplay("userInfo");
     });
    }
    else {
      this.emailAlreadyTaken = true;
    }
  }
  )}

  toggleDisplay(view: string) {
    this.investmentService.toggleDisplay(view);
  }

  isUserNull(){
    if (this.currentUser === null) {
      this.firstNameEmpty = true;
      this.lastNameEmpty = true;
      this.emailEmpty = true;
    }
  }

}
