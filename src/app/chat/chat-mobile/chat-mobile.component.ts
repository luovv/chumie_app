import {Component, OnInit, Output, Input, EventEmitter, AfterViewChecked} from '@angular/core';
import  "../../../assets/js/jquery.js";

declare var $: any;
@Component({
  selector: 'app-chat-mobile',
  templateUrl: './chat-mobile.component.html',
  styleUrls: ['./chat-mobile.component.css']
})
export class ChatMobileComponent implements OnInit {
  // @Input() target = '';
  @Input() messages = [];
  @Input() target = {};
  @Input() my = {};
  @Output() sendMessage = new EventEmitter();
  private myMessage = "";
  private _setIntervalHandler: any;

  public invoicId = '';
  public isFreeEvent = true;

  private linkToInvoice = '';

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('isFreeEvent') === 'No') {
      this.isFreeEvent = false;
      this.invoicId = localStorage.getItem('invoiceId');
      this.linkToInvoice = '/invoice/'+ this.invoicId +'/user/' + this.my['id'];//{{my.id}}

    } else {
      this.linkToInvoice = '/group/'+ this.target['id'];
    }
    console.log(this.linkToInvoice);
    var bfscrolltop = document.body.scrollTop;
    var that = this;
    var interval: any;

    $("input-box.myMessage").focus(function(){
      this.interval = setInterval(function(){
        document.body.scrollTop = document.body.scrollHeight*0.72;
      }, 500);
    });
    $("input-box.myMessage").blur(function(){
      clearInterval(interval);
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

  onSentMsgBtnClick(event) {
    this.sendMessage.emit(this.myMessage);
    this.myMessage = ' ';
    this.scrollDown();

  }

  scrollDown(){
    document.getElementById('window').scrollIntoView(false);
    document.getElementById('window').scrollTop = document.getElementById('input-box').offsetHeight;
  }
}
