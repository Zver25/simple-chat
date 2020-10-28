import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';
import {Observable} from 'rxjs';
import {IMessage} from '../model/message.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() user: string;
  messages$: Observable<Array<IMessage>>;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.messages$ = this.chatService.getMessagesForUser$(this.user);
  }

  onKeyDown(event: KeyboardEvent, textMessageEl: HTMLTextAreaElement): void {
    if (event.code === 'Enter' && event.ctrlKey) {
      this.sendMessage(textMessageEl);
    }
  }

  sendMessage(textMessageEl: HTMLTextAreaElement): void {
    this.chatService.sendMessage({
      user: this.user,
      text: textMessageEl.value,
      deleted: '',
      date: moment()
    });
    textMessageEl.value = '';
  }

  handlerDeleteMessage(message: IMessage, isForAll: boolean): void {
    this.chatService.deleteMessage(message, isForAll ? 'all' : this.user);
  }

}
