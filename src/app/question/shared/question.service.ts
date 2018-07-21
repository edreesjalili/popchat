import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: ReplaySubject<string[]> = new ReplaySubject(1)

  constructor(private http: HttpClient) { }

  getQuestions(forceRefresh?: boolean): ReplaySubject<string[]> {
    if (!this.questions.observers.length || forceRefresh) {
      this.http.get('config/questions.json').subscribe((response: any) => {
        this.questions.next(response)
        
      }, (error) => {
          this.questions.error(error)
          this.questions = new ReplaySubject(1)
          this.handleError(error)
      })
    }

    return this.questions
  }

  getRandomQuestions(questions: string[], limit: number): string[] {
    let endIndex: number = limit;
    if (endIndex > questions.length) {
      endIndex = questions.length;
    }
    return this.shuffle(questions).slice(0, endIndex);
  }

  private shuffle(questions: string[]): string[] {
    let currentIndex = questions.length;

    while (0 !== currentIndex) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      const temporaryValue = questions[currentIndex];
      questions[currentIndex] = questions[randomIndex];
      questions[randomIndex] = temporaryValue;
    }

    return questions;
  }

  /**
   * @private
   * Handles an error by creating a new observable that emits it.
   * @param {Response} error - The error.
   * @returns {Observable<any>} An observable that emits an error.
   */
  private handleError(error: Response): Observable<any> {
    return observableThrowError(error)
  }
}
