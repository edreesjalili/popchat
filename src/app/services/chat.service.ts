import { Injectable } from '@angular/core';
import { ChatManager, TokenProvider } from '@pusher/chatkit'
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _chatManager: any;
  private _currentUser: any;

  constructor(private authService: AuthService) {
    this._chatManager = new ChatManager({
      instanceLocator: 'v1:us1:960946cb-4763-4185-8e35-4c05a10f722e',
      userId: authService.currentUser._id,
      tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/960946cb-4763-4185-8e35-4c05a10f722e/token' })
    });
  }

  sendMessage(message: string, _roomId: string) {
    return this._currentUser.sendMessage({
      text: message,
      roomId: _roomId
    })
    .then(messageId => {
      console.log(`Added message to ${_roomId}`)
    })
    .catch(err => {
      console.log(`Error adding message to ${_roomId}: ${err}`)
    });
  }

  join(_roomId: string): Promise<any> {
    return this._currentUser.joinRoom({ roomId: _roomId })
      .then(room => {
        console.log(`Joined room with ID: ${_roomId}`)
      })
      .catch(err => {
        console.log(`Error joining room ${_roomId}: ${err}`)
      });
  }

  getChatManager() {
    return this._chatManager;
  }

  getConnection(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this._currentUser) {
        this._chatManager.connect()
        .then(currentUser => {
          this._currentUser = currentUser;
          resolve(this._currentUser);
        })
        .catch(error => reject(error));
      } else {
        resolve(this._currentUser)
      }
    });
  }
}
