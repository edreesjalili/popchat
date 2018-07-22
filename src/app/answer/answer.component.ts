import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../conversation/shared/conversation.service';
import { Conversation } from '../conversation/shared/conversation';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';
import { UserService } from '../user/shared/user.service';
import { User } from '../user/shared/user';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  answeringForm: FormGroup;
  conversation: Conversation;
  askingUser: User;
  question: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private conversationService: ConversationService,
    private userService: UserService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.conversationService.getNextAvailableConversation().subscribe((conversation: Conversation) => {
      this.conversation = conversation;
      const otherUserId: string = this.conversationService.getOtherUserId(conversation.userIds, this.authService.currentUser._id);
      this.userService.getUser(otherUserId).subscribe((user: User) => {
        this.askingUser = user;
      });
      this.chatService.getMessages(+this.conversation.roomId, 'newer').then(messages => {
        this.question = messages[0].text;
      });
    });

    this.answeringForm = new FormGroup({
      answer: new FormControl(null)
    });
  }

  answerQuestion(): void {
    const answer: string = this.answeringForm.get('answer').value;
    this.conversationService.updateConversation(this.conversation._id).subscribe((conversation: Conversation) => {
      this.chatService.sendMessage(answer, conversation.roomId).then(() => {
        this.router.navigate(['/conversations', this.conversation._id]);
      });
    });
  }
}
