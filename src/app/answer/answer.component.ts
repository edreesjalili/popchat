import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../conversation/shared/conversation.service';
import { Conversation } from '../conversation/shared/conversation';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  answeringForm: FormGroup;
  
  constructor(
    private router: Router,
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    // join the oldest available conversation
    this.conversationService.getNextAvailableConversation().subscribe((conversation: Conversation) => {
      // this.userService.getUser()
    });

    this.answeringForm = new FormGroup({
      answer: new FormControl(null)
    });
  }

  answerQuestion(): void {
    //TODO - Update conversation and navigate to it
    const answer: string = this.answeringForm.get('answer').value;
    this.router.navigate(['/conversations', 123]);
  }
}
