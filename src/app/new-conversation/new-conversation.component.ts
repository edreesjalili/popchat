import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss']
})
export class NewConversationComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    if (!this.chatService.isConnected()) {
      this.chatService.getConnection().then(currentUser => {
        
      }).catch((error: any) => {
        console.log(error)
      });
    }
  }
}
