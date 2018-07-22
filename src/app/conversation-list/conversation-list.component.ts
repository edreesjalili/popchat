import { Component, OnInit, DoCheck } from '@angular/core';
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

  getRooms() {
    this.chatService.getConnection().then(currentUser => {
      console.log(currentUser.rooms);
      if (currentUser.rooms[0]) {
        this.conversationService.getByRoom(this.authService.currentUser._id)
          .subscribe((conversations: Conversation[]) => this.conversations = conversations);
      }
    })
    .catch((error: any) => {
      console.log(error);
    });
  }

  ngOnInit() {
    if (!this.chatService.isConnected()) {
      this.getRooms();
    } else {
      this.getRooms();
    }
  }
}
