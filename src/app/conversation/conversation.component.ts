import { Component, OnInit } from '@angular/core';
import { ConversationService } from './shared/conversation.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Conversation } from './shared/conversation';
import { IChat } from './shared/chat.interface';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../auth/shared/auth.service';
import { UserService } from '../user/shared/user.service';
import { pipe } from '../../../node_modules/@angular/core/src/render3/pipe';
import { User } from '../user/shared/user';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  conversation: Conversation;
  chats: IChat[] = [];
  messageForm: FormGroup;
  sending: Boolean;
  currentUserId: string;
  match: User;

  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService,
    private chatService: ChatService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.sending = false;

    this.messageForm = new FormGroup({
      message: new FormControl(null)
    });

    this.currentUserId = this.authService.currentUser._id;

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.conversationService.getConversation(params.get('id')))
    ).subscribe((conversation: Conversation) => {
      this.conversation = conversation;
      if (!this.chatService.isConnected()) {
        this.chatService.getConnection().then(currentUser => {
        })
        .then(() => {
          this.chatService.getMessages(+this.conversation.roomId, 'older').then((messages: IChat[]) => {
            this.chats = messages;
            this.userService.getUser(messages.find(m => !this.isMe(m.id)).sender.id).subscribe(matchedUser => {
              this.match = matchedUser;
            });
          });
          this.chatService.subscribeToRoom(+this.conversation.roomId, {
            onNewMessage: (message: IChat) => {
              this.chats.push(message);
              console.log(this.chats);
            },
          })
          .catch(error => console.log(error));
        })
        .catch((error: any) => {
          console.log(error);
        });
      }
    });
  }

  isMe(userId: string): Boolean {
    return userId === this.currentUserId;
  }

  handleSend() {
    this.sending = true;
    const input = this.messageForm.controls.message as FormControl;
    this.chatService.sendMessage(input.value, this.conversation.roomId).then((message: IChat) => {
      this.chats.push(message);
      input.reset();
      this.sending = false;
    });
  }
}
