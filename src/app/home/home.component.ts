import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../conversation/shared/conversation.service';
import { Conversation } from '../conversation/shared/conversation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private conversationService: ConversationService) { }

  ngOnInit() {
    this.conversationService.getConversation("5b53a8725a32f48456b33661").subscribe((conversation => {

      console.log(conversation);
    }));
  }

}
