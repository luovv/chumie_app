import {Component, OnInit, Output, Input, EventEmitter, AfterViewChecked} from '@angular/core';
import  "../../../assets/js/jquery.js";

declare var $: any;
@Component({
  selector: 'app-chat-mobile',
  templateUrl: './chat-mobile.component.html',
  styleUrls: ['./chat-mobile.component.css']
})
export class ChatMobileComponent implements OnInit, AfterViewChecked {
  // @Input() target = '';
  @Input() messages = [];
  @Input() target = {};
  @Output() sendMessage = new EventEmitter();
  private myMessage="";

  constructor() { }

  ngOnInit() {
    var bfscrolltop = document.body.scrollTop;

    $("input-box.myMessage").focus(function(){
      var interval = setInterval(function(){
        document.body.scrollTop = document.body.scrollHeight;
      },200)
    }).blur(function(){//设定输入框失去焦点时的事件
      // clearInterval(interval);//清除计时器
      document.body.scrollTop = bfscrolltop;
    });
  }
  pressKey(key){
    if(key.key=='Enter'){
      this.sendMessage.emit(this.myMessage);
      this.myMessage="";
    }
  }

  // adjustPage(event){
  //   var inputTextBox = document.getElementById('chat-window-input-box');
  //   setInterval(function(){
  //     inputTextBox.scrollIntoView(false);
  //     // inputTextBox.scrollIntoView(true);
  //     // inputTextBox.scrollIntoViewIfNeeded();
  //   },200);
  // }

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
