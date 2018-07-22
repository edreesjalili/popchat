import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getTopUsers(limit: number): Observable<User[]> {
    return this.http.get(`/api/v1/users/?sort=true&limit=${limit}`).pipe(
      map((response: any) => {
        return <User[]> response;
      }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  getUser(userId: string): Observable<User> {
    return this.http.get(`/api/v1/users/${userId}`).pipe(
      map((response: any) => {
        return new User(response);
      }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch(`/api/v1/users/${user._id}`, user).pipe(
      map((response: any) => {
        return new User(response);
      }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * @private
   *
   * Handles an error by creating a new observable that emits it.
   * @param {Response} error - The error.
   * @returns {Observable<any>} An observable that emits an error.
   */
  private handleError(error: Response): Observable<any> {
    return observableThrowError(error);
  }
}
