import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit{
  @Input() messages = [];
  @Output() sendMessage = new EventEmitter();
  private myMessage="";
  constructor() { }

  ngOnInit() {
  }
  pressKey(key){
    if(key.key=='Enter'){
      this.sendMessage.emit(this.myMessage);
      this.myMessage="";
    }
  }
}
