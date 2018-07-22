import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { concatMap, map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../../user/shared/user';
import { ChatService } from '../../services/chat.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.authService.isAuthenticated()) {
      return of(true)
    }
    else {
      return this.authService.getCurrentUser().pipe(
        map((user: User) => {
          return true;
        }),
        catchError((error: any) => {
          return of(false);
        })
      );
    }
  }
}
