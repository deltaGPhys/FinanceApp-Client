import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {GoalServiceService} from '../../services/goal-service.service';
import { Router } from '@angular/router';
import{User} from '../../models/User';
import { SavingGoal } from '../../models/Saving-goal.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {
  createSavingGoalForm : FormGroup;
  private savingGoal: SavingGoal;
  private user: User;
  date: string;

  constructor(private goalService: GoalServiceService, private router: Router, private loginService: LoginService) { 
    this.createSavingGoalForm = this.createFormGroup();
    this.loginService.userToDisplay$.subscribe(data => this.user = data);
  }

  ngOnInit() {
  }

  createFormGroup() {
    return new FormGroup({
        goalAmount: new FormControl(''),
        endDate: new FormControl(''),
        description: new FormControl('')
  });
  }

  revert() {
    this.createSavingGoalForm.reset();
  }

  onSubmit() {
    console.log(this.createSavingGoalForm.controls.endDate.value)
    let savingGoal : SavingGoal = new SavingGoal (
      null,
      this.createSavingGoalForm.controls.goalAmount.value,
      null,
      null,
      this.createSavingGoalForm.controls.endDate.value,
      this.createSavingGoalForm.controls.description.value,
      );
      
      this.goalService.addGoal(savingGoal)
        .subscribe(data => {this.savingGoal = data;});
        
      console.log(this.savingGoal);

      this.goalService.getAllGoals(this.user.id).subscribe(data => (console.log(data)));      

      

      this.revert();

      this.router.navigate(['/goals']);

    }

    

}
