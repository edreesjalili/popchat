import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../user/shared/user';
import { Oauth } from '../user/shared/oauth';
import { QuestionService } from '../question/shared/question.service';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user/shared/user.service';
import { FormControl } from '@angular/forms';
import { ConversationService } from '../conversation/shared/conversation.service';
import { Conversation } from '../conversation/shared/conversation';

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss']
})
export class NewConversationComponent implements OnInit {
  questions: string[];
  answeringForm: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private questionService: QuestionService,
    private userService: UserService,
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    if (this.authService.currentUser.asking) {
      this.questionService.getQuestions().subscribe((questions: string[]) => {
        this.questions = this.questionService.getRandomQuestions(questions, 3);
      });
    }
    else {
      // join the oldest available conversation
      this.conversationService.getNextAvailableConversation().subscribe((conversation: Conversation) => {
        // this.userService.getUser()
      });

      this.answeringForm = new FormGroup({
        answer: new FormControl(null)
      });
    }
  }

  answerQuestion(): void {
    //TODO - Update conversation and navigate to it
    const answer: string = this.answeringForm.get('answer').value;
    this.router.navigate(['/conversations', 123]);
  }

  askQuestion(question: string): void {
    this.authService.currentUser.asking = !this.authService.currentUser.asking;
    this.userService.updateUser(this.authService.currentUser).subscribe((user: User) => {
      this.authService.setCurrentUser(user);
    });
    this.router.navigate(['/conversations']);
  }
}
