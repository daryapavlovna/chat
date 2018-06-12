import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../shared/services/threads.service';

import { Observable } from 'rxjs/index';


@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.scss']
})
export class ChatThreadsComponent implements OnInit {
  threads: Observable<any>;
  constructor(private threadsService: ThreadsService) {
    this.threads = threadsService.orderedThreads;
  }

  ngOnInit() {
  }

}
