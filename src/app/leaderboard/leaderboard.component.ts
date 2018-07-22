import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/shared/user.service';
import { User } from '../user/shared/user';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  
  users: User[] = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (!this.chatService.isConnected()) {
      this.chatService.getConnection().then(currentUser => {
        
      }).catch((error: any) => {
        console.log(error)
      });
    }

    this.userService.getTopUsers(5).subscribe(users => this.users = users)
  }
}
