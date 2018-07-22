import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { QuestionService } from '../question/shared/question.service';
import { UserService } from '../user/shared/user.service';
import { User } from '../user/shared/user';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {
  questions: string[];

  constructor(
    public authService: AuthService,
    private router: Router,
    private questionService: QuestionService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.authService.currentUser.asking) {
      this.questionService.getQuestions().subscribe((questions: string[]) => {
        this.questions = this.questionService.getRandomQuestions(questions, 3);
      });
    }
  }

  askQuestion(question: string): void {
    this.authService.currentUser.asking = !this.authService.currentUser.asking;
    this.userService.updateUser(this.authService.currentUser).subscribe((user: User) => {
      this.authService.setCurrentUser(user);
    });
    this.router.navigate(['/conversations']);
  }

}
