import { Component, OnInit} from '@angular/core';
import{User} from '../../models/User';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {CreateAccountService} from '../../services/create-account.service'
import { Router } from '@angular/router';


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
  //private allUsers: User [];
  emailAlreadyTaken : boolean = false;
 
  constructor(private createAccountService: CreateAccountService, private router: Router) { 
    this.createUserForm = this.createFormGroup();
    
    this.userEmails = this.createAccountService.getAllEmails()
        .subscribe(value => {this.allEmails = value; console.log(this.allEmails);});;
  }

  ngOnInit() {
    
  }

  createFormGroup() {
    return new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        rent: new FormControl('', [Validators.required, Validators.pattern('^[0-9.]+$')]),
        salary: new FormControl('', [Validators.required, Validators.pattern('^[0-9.]+$')])
  });
  }

  revert() {
    this.createUserForm.reset();
  }

  onSubmit() {
    this.userEmail = this.createUserForm.controls.email.value;

    if(this.checkForEmail(this.allEmails, this.userEmail)){
      let user: User = new User (
      null,
      this.createUserForm.controls.firstName.value,
      this.createUserForm.controls.lastName.value,
      this.createUserForm.controls.email.value,
      this.createUserForm.controls.password.value,
      this.createUserForm.controls.rent.value,
      this.createUserForm.controls.salary.value);
    
   
    console.log(user);
    
    this.createAccountService.addUser(user)
      .subscribe(data => {this.user = data;});
      
      this.revert();

      this.router.navigate(['/accounts']);
      }

    else {
        this.emailAlreadyTaken = true;
        this.router.navigate(['/register']);
    }
  }
  
  checkForEmail(allEmails, email): boolean{
    for (let i = 0; i < allEmails.length; i++) {
      if(email === allEmails[i]){
      console.log ("This email NOT available");
      return false;
      }
    }
    return true;
  }

  // userEmailCheck(email:string) : boolean {
  //   this.userCheck = this.createAccountService.userEmailCheck(email).subscribe(data => {this.emailAlreadyTaken = data; console.log(data);});
  //   console.log("userEmail check " + this.emailAlreadyTaken);
  //   return this.emailAlreadyTaken;
  // }

  // async delay(ms: number) {
  //   await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  // }
}
