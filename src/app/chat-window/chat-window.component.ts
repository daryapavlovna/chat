import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { Thread } from '../shared/classes/thread.model';
import { Message } from '../shared/classes/message.model';
import { User } from '../shared/classes/user.model';
import { MessagesService } from '../shared/services/messages.service';
import { ThreadsService } from '../shared/services/threads.service';
import { UsersService } from '../shared/services/users.service';

import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
  condition: boolean;
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;
  constructor(private messagesService: MessagesService, private threadsService: ThreadsService,
              private usersService: UsersService, private el: ElementRef) { }

  ngOnInit() {
    this.messages = this.threadsService.currentThreadMessages;
    this.draftMessage = new Message();
    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });
    this.usersService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        });
    this.messages
      .subscribe();
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
    // const scroll = this.el.nativeElement.querySelector('chat-window-container');
  }

  iconClick(): void {
    this.condition = !this.condition;
  }

}
