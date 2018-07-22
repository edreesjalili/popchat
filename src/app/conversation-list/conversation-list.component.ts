import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { ConversationService } from '../conversation/shared/conversation.service';
import { Conversation } from '../conversation/shared/conversation';
<<<<<<< HEAD
import { ChatService } from '../services/chat.service';
=======
import { User } from '../user/shared/user';
import { UserService } from '../user/shared/user.service';
>>>>>>> 15d51d25b0e331256eb57ada3744a3973d3f93d8

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
<<<<<<< HEAD
    private conversationService: ConversationService,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    // this.conversationService.getConversationsForUser( this.authService.currentUser._id).subscribe((conversations: Conversation[]) =>
    // {
    //   this.conversations = conversations;
    // } );
    console.log(this.chatService.getConnection())
    this.chatService.getConnection()
      .then(currentUser => {
        console.log(currentUser)
        this.chatService.join(currentUser.rooms[0].id).then(room => console.log(room));
      })
      .catch(error => console.log(error));
=======
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

  
>>>>>>> 15d51d25b0e331256eb57ada3744a3973d3f93d8
  }

}
