import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { ConversationService } from '../conversation/shared/conversation.service';
import { Conversation } from '../conversation/shared/conversation';
import { User } from '../user/shared/user';
import { UserService } from '../user/shared/user.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {

  conversations : Conversation[];
  combos = [];


  constructor(
    public authService: AuthService,
    private userService: UserService,
    private conversationService: ConversationService

  ) { }

  ngOnInit() {
    this.conversationService.getConversationsForUser( this.authService.currentUser._id).subscribe((conversations: Conversation[]) =>
    {
      for(let conversation of conversations )
      {
        const pulledUserId = this.conversationService.getOtherUserId(conversation.userIds, this.authService.currentUser._id);
        this.userService.getUser(pulledUserId).subscribe(user =>
          {
            this.combos.push({conversation,user})
          })
      }


    } );

  
  }

}

