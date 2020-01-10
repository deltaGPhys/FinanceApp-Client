import { Component, OnInit } from '@angular/core';
import {SavingGoal} from '../../models/Saving-goal.model';
import { GoalServiceService } from '../../services/goal-service.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';



@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
 
  currentUser: User;
  allGoals: SavingGoal[];
  

  constructor(private goalService: GoalServiceService, private userService: UserService) { 
    this.goalService.savingGoals$.subscribe(data => this.allGoals = data);
    this.userService.currentUser$
      .subscribe(data => {
          this.currentUser = data; 
          console.log("USER",data);
          this.goalService.getAllGoalsForUser(this.currentUser.id)
            .subscribe(data => {console.log("DATA",data);this.goalService.savingGoals$.next(data);});
      });
    
    // this.goalService.getAllGoalsForUser(this.id)
    //     .subscribe(value => {this.allGoals = value; console.log(this.allGoals);});;
    
        //console.log(this.goals);
    //.subscribe(value => {this.allGoals = value; console.log(this.allGoals);});
    
    //this.goalService.updateSavingsGoals(this.userId);

    // this.goalService.getAllGoals()
    // .subscribe(value => {this.allGoals = value; console.log(this.allGoals);});;

  
  }

  ngOnInit() {

  }

  //Storing list of goals in the service.  new Behavior Subject
  //in Service store an observable of the desired variable
  //method in the service to change the observable to whatever the new value will be
  //http request that gets the new values
  //in component subscribe to the observable from the service

}
