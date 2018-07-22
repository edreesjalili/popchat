import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './user/shared/user.service';
import { NewConversationComponent } from './new-conversation/new-conversation.component';
import { AuthGuardService } from './auth/shared/auth-guard.service';
import { AuthService } from './auth/shared/auth.service';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AskComponent } from './ask/ask.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewConversationComponent,
    ConversationListComponent,
    ConversationComponent,
    LeaderboardComponent,
    AskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
