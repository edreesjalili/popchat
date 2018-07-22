import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewConversationComponent } from './new-conversation/new-conversation.component';
import { AuthGuardService } from './auth/shared/auth-guard.service';
import { ConversationListComponent } from './conversation-list/conversation-list.component';

const routes: Routes = [
  { 
    path: 'conversations/new', 
    component: NewConversationComponent, 
    canActivate: [AuthGuardService]
  },
  { 
    path: 'conversations', 
    component: ConversationListComponent, 
    canActivate: [AuthGuardService]
  },
  { 
    path: '', 
    component: HomeComponent, 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule {}
