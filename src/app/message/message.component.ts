import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Moment} from 'moment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() user: string;
  @Input() text: string;
  @Input() time: Moment;
  @Input() isSelfMessage: boolean;
  @Output() onDelete = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  handleDelete(forAll: boolean): void {
    this.onDelete.emit(forAll);
  }
}
