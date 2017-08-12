import {Component, OnInit, Output, Input, EventEmitter, AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-chat-mobile',
  templateUrl: './chat-mobile.component.html',
  styleUrls: ['./chat-mobile.component.css']
})
export class ChatMobileComponent implements OnInit, AfterViewChecked {
  @Input() messages = [];
  @Input() target = {};
  @Output() sendMessage = new EventEmitter();
  private myMessage="";

  constructor() { }

  ngOnInit() { }
  pressKey(key){
    if(key.key=='Enter'){
      this.sendMessage.emit(this.myMessage);
      this.myMessage="";
    }
  }
  onSentMsgBtnClick(event){

    this.sendMessage.emit(this.myMessage);
    this.myMessage="";
    this.scrollDown();
  }
  ngAfterViewChecked(){
    this.scrollDown();
  }
  scrollDown(){
    document.getElementById('window').scrollIntoView(false);
  }
}
