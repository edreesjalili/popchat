import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Conversation } from './conversation';
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
        return this.handleError(error)
      })
    );
  }

  getConversation(conversationId: string): Observable<Conversation> {
    return this.http.get(`/api/v1/conversations/${conversationId}`).pipe(
      map((response: any) => {
        return new Conversation(response);
      }),
      catchError((error: any) => {
        return this.handleError(error)
      })
    );
  }

  getNextAvailableConversation(): Observable<Conversation> {
    return this.http.get('/api/v1/conversations/join').pipe(
      map((response: any) => {
        return new Conversation(response);
      }),
      catchError((error: any) => {
        return this.handleError(error)
      })
    );
  }

  /**
   * Returns the user ID in the given array that isn't the provided user ID.
   * @param userIds 
   * @param userId 
   */
  getOtherUserId(userIds: string[], userId: string): string {
    const index = userIds.indexOf(userId);
    return userIds.splice(index, 1)[0];
  }

  /**
   * @private
   * 
   * Handles an error by creating a new observable that emits it.
   * @param {Response} error - The error.
   * @returns {Observable<any>} An observable that emits an error.
   */
  private handleError(error: Response): Observable<any> {
    return observableThrowError(error)
  }
}
