import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MessagesService } from './shared/services/messages.service';
import { UsersService } from './shared/services/users.service';
import { ThreadsService } from './shared/services/threads.service';
import { ChatThreadComponent } from './chat-threads/chat-thread/chat-thread.component';
import { ChatMessageComponent } from './chat-window/chat-message/chat-message.component';
import { FromNowPipe } from './shared/pipes/from-now.pipe';
import { FormsModule } from '@angular/forms';
import {ChatPageComponent} from "./chat-page/chat-page.component";

@NgModule({
  declarations: [
    AppComponent,
    ChatNavBarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    ChatThreadComponent,
    ChatMessageComponent,
    FromNowPipe,
    ChatPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    MessagesService,
    UsersService,
    ThreadsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
