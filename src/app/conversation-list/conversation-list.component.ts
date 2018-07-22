import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { ConversationService } from '../conversation/shared/conversation.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    this.conversationService.getConversation( this.authService.currentUser._id);
  }

}
