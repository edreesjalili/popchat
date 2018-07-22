import { Component, OnInit } from '@angular/core';
import { ConversationService } from './shared/conversation.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Conversation } from './shared/conversation';
import { IChat } from './shared/chat.interface';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  conversation: Conversation;
  chats: IChat[] = [];

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private conversationService: ConversationService
  ) { }

  handleSend() {
    console.log('message');
  }

  ngOnInit() {
    if (!this.chatService.isConnected()) {
      this.chatService.getConnection().then(currentUser => {
        
      }).catch((error: any) => {
        console.log(error)
      });
    }

    this.conversationService.mockConversations().subscribe((messages: IChat[]) => this.chats = messages)

    console.log(this.chats)

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.conversationService.getConversation(params.get('id')))
    ).subscribe((conversation: Conversation) => {
      this.conversation = conversation;
    });
  }

  sendMessage(message: string) {
    // this.sending = true;
    // this._chatService.sendMessage(message)
    //   .subscribe(resp => {
    //     this.message = undefined;
    //     this.sending = false;
    //   }, err => {
    //     this.sending = false;
    //   } );

    const sentMessage: IChat =
      {
        id: '1',
        displayName: 'ibz',
        email: 'ibz@',
        type: 'human',
        message: message,
        createdAt: new Date(),
        isMe: true,
      } as IChat

      this.chats.push(sentMessage);

    console.log('message');
  }

}
