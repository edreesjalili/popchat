import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { ConversationService } from '../conversation/shared/conversation.service';
import { Conversation } from '../conversation/shared/conversation';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {

  conversations: Conversation[];
  combos = [];


  constructor(
    public authService: AuthService,
    private conversationService: ConversationService,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    // this.conversationService.getConversationsForUser( this.authService.currentUser._id).subscribe((conversations: Conversation[]) =>
    // {
    //   this.conversations = conversations;
    // } );
    console.log(this.chatService.getConnection());
    this.chatService.getConnection()
      .then(currentUser => {
        console.log(currentUser);
        this.chatService.join(currentUser.rooms[0].id).then(room => console.log(room));
      })
      .catch(error => console.log(error));
  }

}
