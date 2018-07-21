import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../user/shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get('/auth/user').pipe(
      map((response: any) => {
        this.setCurrentUser(new User(response));
        return this.currentUser;
      }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * Determines whether or not there is a currently logged in user.
   * @returns {boolean} True if there is a logged in user. False if there isn't.
   */
  isAuthenticated(): boolean  {
    return !!this.currentUser;
  }

  /**
   * Sets the currently logged in user to the given user.
   * @param {User} user - The user to set.
   */
  setCurrentUser(user: User): void {
    this.currentUser = user;
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
