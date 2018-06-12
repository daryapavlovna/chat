import { Injectable } from '@angular/core';
import { Message } from '../classes/message.model';
import { Thread } from '../classes/thread.model';
import { User } from '../classes/user.model';

import { Observable, Subject } from 'rxjs/index';
import {filter, map, publishReplay, refCount, scan} from "rxjs/internal/operators";

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();
  updates: Subject<any> = new Subject<any>();
  create: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates.pipe(
      scan((messages: Message[], operation: IMessagesOperation) => {
        return operation(messages);
      }, initialMessages),
      publishReplay(),
      refCount()
    );
    this.create.pipe(
      map(function (message: Message): IMessagesOperation {
        return (messages: Message[]) =>  messages.concat(message);
      })
    ).subscribe(this.updates);
    this.newMessages.subscribe(this.create);

    this.markThreadAsRead.pipe(
      map((thread: Thread) => {
       return (messages: Message[]) => {
         return messages.map((message: Message) => {
           if (message.thread.id === thread.id) {
             message.isRead = true;
           }
           return message;
         })
       }
    })
    ).subscribe(this.updates);
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User) {
    return this.newMessages.pipe(
      filter((message: Message) => {
        return (message.thread.id === thread.id) && (message.author.id !== user.id);
      })
    )
  }
}

export const messagesServiceInjectables: Array<any> = [
  MessagesService
];
