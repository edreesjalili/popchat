import { Injectable } from '@angular/core';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import { AuthService } from '../auth/shared/auth.service';
import { ConversationService } from '../conversation/shared/conversation.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _chatManager: any;
  private _currentUser: any;
  private url = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/960946cb-4763-4185-8e35-4c05a10f722e/token';

  constructor(private authService: AuthService, private conversationService: ConversationService) {}

  isConnected(): boolean {
    return !!this._currentUser;
  }

  sendMessage(message: string, _roomId: string): Promise<any> {
    return this._currentUser.sendMessage({
      text: message,
      roomId: _roomId
    })
    .then(messageId => {
      console.log(`Added message to ${_roomId}`);
    })
    .catch(err => {
      console.log(`Error adding message to ${_roomId}: ${err}`);
    });
  }

  join(roomId: string): Promise<any> {
    return this._currentUser.joinRoom({ roomId })
      .then(room => {
        console.log(`Joined room with ID: ${room.id}`);
      })
      .catch(err => {
        console.log(`Error joining room ${roomId}: ${err}`);
      });
  }

  subscribeToRoom(roomId: number, hooks: any): Promise<any> {
    return this._currentUser.subscribeToRoom({ roomId, hooks, messageLimit: 100 });
  }

  getMessages(roomId: number, direction: 'newer' | 'older', limit: number = 20): Promise<any> {
    return this._currentUser.fetchMessages({ roomId, direction, limit })
      .catch(error => console.log(error));
  }

  createRoom(question: string): Promise<any> {
    return this._currentUser.createRoom({
        name: `${new Date().getMilliseconds()}`,
        private: false,
        addUserIds: [this.authService.currentUser._id]
      }).then(room => {
        this.conversationService.createConversation(room.id).toPromise().catch(error => console.log(error));
        this.sendMessage(question, room.id);
      });
  }

  getChatManager() {
    return this._chatManager;
  }

  getConnection(): Promise<any> {
    this.createChatManager();

    return new Promise((resolve, reject) => {
      if (!this._currentUser) {
        this._chatManager.connect()
        .then(currentUser => {
          this._currentUser = currentUser;
          resolve(this._currentUser);
        })
        .catch(error => reject(error));
      } else {
        resolve(this._currentUser);
      }
    });
  }

  createChatManager(): void {
    if (this._chatManager) {
      return;
    }

    this._chatManager = new ChatManager({
      instanceLocator: 'v1:us1:960946cb-4763-4185-8e35-4c05a10f722e',
      userId: this.authService.currentUser._id,
      tokenProvider: new TokenProvider({ url: this.url})
    });
  }
}
