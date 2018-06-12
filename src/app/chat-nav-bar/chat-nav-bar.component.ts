import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../shared/services/messages.service';
import { ThreadsService } from '../shared/services/threads.service';
import { Message } from '../shared/classes/message.model';
import { Thread } from '../shared/classes/thread.model';

import { combineLatest } from "rxjs/internal/operators";
import * as _ from 'lodash';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.scss']
})
export class ChatNavBarComponent implements OnInit {
  unreadMessagesCount: number;
  constructor(private messagesService: MessagesService, private threadsService: ThreadsService) { }

  ngOnInit() {
    this.messagesService.messages.pipe(
      combineLatest(
        this.threadsService.currentThread,
        (messages: Message[], currentThread: Thread) =>
          [currentThread, messages] )
    ).subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount =
          _.reduce(
            messages,
            (sum: number, m: Message) => {
              const messageIsInCurrentThread: boolean = m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              if (m && !m.isRead && !messageIsInCurrentThread) {
                sum = sum + 1;
              }
              return sum;
            },
            0);
      });
  }

}
