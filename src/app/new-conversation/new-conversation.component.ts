import { Component, OnInit } from '@angular/core';
import { User } from '../user/shared/user';
import { Oauth } from '../user/shared/oauth';
import { QuestionService } from '../question/shared/question.service';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss']
})
export class NewConversationComponent implements OnInit {
  questions: string[];
  askingUser: User;

  constructor(
    public authService: AuthService,
    private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe((questions: string[]) => {
      this.questions = this.questionService.getRandomQuestions(questions, 3);
    });

    //TODO - Replace with service call
    this.askingUser = new User({
      firstName: 'Bob',
      lastName: 'Jones',
      email: 'bob.jones@example.com',
      profileImageUrl: 'http://via.placeholder.com/100/19b5fe/ffffff',
      asking: true,
      oauth: new Oauth({
        platform: 'facebook',
        id: 1234
      })
    });
  }

}
