import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss']
})
export class NewConversationComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    //TODO - Remove. It's just for testing
    this.authService.currentUser.asking = false;
  }
}
