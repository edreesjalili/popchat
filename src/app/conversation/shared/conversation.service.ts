import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable, ReplaySubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Conversation } from './conversation';
import { IChat } from './chat.interface';
@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  getConversationsForUser(userId: string): Observable<Conversation[]> {
    return this.http.get(`/api/v1/conversations/?userId=${userId}`).pipe(
      map((response: any) => {
        return <Conversation[]> response;
      }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  getConversation(conversationId: string): Observable<Conversation> {
    return this.http.get(`/api/v1/conversations/${conversationId}`).pipe(
      map((response: any) => {
        return new Conversation(response || {});
      }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  createConversation(roomId: number): Observable<Conversation> {
    return this.http.post('api/v1/conversations', { roomId }).pipe(
      map(data => data as Conversation),
      catchError(error => this.handleError(error))
    );
  }

  getNextAvailableConversation(): Observable<Conversation> {
    return this.http.get('/api/v1/conversations/join').pipe(
      map((response: any) => {
        return new Conversation(response);
      }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  updateConversation(conversation: Conversation) {
    conversation.hasAnswered = true;
    return this.http.patch(`/api/v1/conversations/${conversation._id}`, conversation).pipe(
      map((data: Conversation) => data),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Returns the user ID in the given array that isn't the provided user ID.
   * @param userIds The other userIds
   * @param userId The provided userId
   */
  getOtherUserId(userIds: string[], userId: string): string {
    const index = userIds.indexOf(userId);
    return userIds.splice(index, 1)[0];
  }

  /**
   * @private
   * Handles an error by creating a new observable that emits it.
   * @param {Response} error - The error.
   * @returns {Observable<any>} An observable that emits an error.
   */
  private handleError(error: Response): Observable<any> {
    return observableThrowError(error);
  }
}
