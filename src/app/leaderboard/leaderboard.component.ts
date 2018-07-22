import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/shared/user.service';
import { User } from '../user/shared/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getTopUsers(5).subscribe(users => this.users = users)
  }
}
