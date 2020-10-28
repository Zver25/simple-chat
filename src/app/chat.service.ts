import { Injectable } from '@angular/core';
import {IMessage} from './model/message.interface';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messages: Array<IMessage>;
  private readonly messages$: Subject<Array<IMessage>>;

  private static compileDeleted(deleted: string, forUser: string): string {
    return deleted && deleted !== forUser ? 'all' : forUser;
  }

  private static isMessageDeletedForUser(message: IMessage, user: string): boolean {
    return message.deleted !== 'all' && message.deleted !== user;
  }

  private static filterDeletedMessage(messages: Array<IMessage>, user: string): Array<IMessage> {
    return messages.filter(message => ChatService.isMessageDeletedForUser(message, user));
  }

  constructor() {
    this.messages = [];
    this.messages$ = new Subject<Array<IMessage>>();
  }

  getMessagesForUser$(user: string): Observable<Array<IMessage>> {
    return this.messages$.pipe(
      map((messages: Array<IMessage>) => ChatService.filterDeletedMessage(messages, user))
    );
  }

  sendMessage(message): void {
    this.messages.push(message);
    this.updateStream();
  }

  private updateStream(): void {
    this.messages$.next(this.messages);
  }

  deleteMessage(message: IMessage, forUser: string): void {
    this.messages = this.messages.map(msg => msg === message
      ? {
        ...msg,
        deleted: ChatService.compileDeleted(msg.deleted, forUser)
      }
      : msg
    );
    this.updateStream();
  }

}
