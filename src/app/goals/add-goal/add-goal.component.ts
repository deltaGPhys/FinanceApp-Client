import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { GoalServiceService } from '../../services/goal-service.service';
import { Router } from '@angular/router';
import{ User } from '../../models/User';
import { SavingGoal } from '../../models/Saving-goal.model';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private goalService: GoalServiceService, private router: Router, private userService: UserService) { 
    this.createSavingGoalForm = this.createFormGroup();
    this.userService.currentUser$.subscribe(data => this.user = data);
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
      this.user.id,
      null,
      this.createSavingGoalForm.controls.endDate.value,
      this.createSavingGoalForm.controls.description.value,
      );
      
      this.goalService.addGoal(savingGoal)
        .subscribe(data => {this.savingGoal = data;});
        

      this.goalService.getAllGoalsForUser(this.user.id).subscribe(data => this.goalService.savingGoals$.next(data));      

      

      this.revert();

      this.router.navigate(['/goals']);

    }

    

}
