import { Component, OnInit } from '@angular/core';
import { ConversationService } from './shared/conversation.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Conversation } from './shared/conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  conversation: Conversation;

  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.conversationService.getConversation(params.get('id')))
    ).subscribe((conversation: Conversation) => {
      this.conversation = conversation;
      console.log(conversation)
    });
  }

}
