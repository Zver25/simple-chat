import {Moment} from 'moment';

export interface IMessage {
  user: string;
  text: string;
  deleted: string;
  date: Moment;
}
