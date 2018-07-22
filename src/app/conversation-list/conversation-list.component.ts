import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { ConversationService } from '../conversation/shared/conversation.service';
import { Conversation } from '../conversation/shared/conversation';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {

  conversations : Conversation[];

  constructor(
    public authService: AuthService,
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    this.conversationService.getConversationsForUser( this.authService.currentUser._id).subscribe((conversations: Conversation[]) =>
    {
      this.conversations = conversations;
    } );
  }

}

