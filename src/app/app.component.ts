import { Component } from '@angular/core';
import { UsersService } from './shared/services/users.service';
import { ThreadsService } from './shared/services/threads.service';
import { MessagesService } from './shared/services/messages.service';
import { ChatExampleData } from './data/chat-example-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private usersService: UsersService, private threadsService: ThreadsService,
              private messagesService: MessagesService) {
    ChatExampleData.init(messagesService, threadsService, usersService);
  }
}
