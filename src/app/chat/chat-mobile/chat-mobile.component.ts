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
  private myMessage = "";
  private _setIntervalHandler: any;

  constructor() { }

  ngOnInit() {
    var bfscrolltop = document.body.scrollTop;
    var that = this;

    $("input-box.myMessage").focus(
      function(){
      var timeoutFun = setTimeout(function(){
        document.body.scrollTop = document.body.scrollHeight;
      },600);
    }
      // that.setInterval
    );

    $("input-box.myMessage").blur(function(){
    //    clearInterval(setInterval(function(){
    //   document.body.scrollTop = document.body.scrollHeight;
    // },100));
    //    clearInterval(that._setIntervalHandler);
      document.body.scrollTop = bfscrolltop;
    });
  }

  setInterval() {
    this._setIntervalHandler = setInterval(() => {
      document.body.scrollTop = document.body.scrollHeight;
    }, 200);
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
