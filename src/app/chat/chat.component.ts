import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import '../../assets/js/RongIMLib-2.2.5.min.js';
import {GlobalService} from "../global.service";
//import '../../assets/js/protobuf-2.1.5.min.js';
declare var RongIMLib: any;
//declare var protobuf: any;


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [HttpService]
})
export class ChatComponent implements OnInit {

  private rongApiKey = 'c9kqb3rdki5pj'; // Get this from RongCloud web console, default 'pkfcgjstfbxv8'
  private rongTokenStr: any;
  private instance:any;

  //todo: 这是左边list需要的信息，目前是hardcode的，你只要动态改变这个值就可以了
  private userList = [];
  private targetId='';
  private myId = GlobalService.data.userId;
  //todo: 这是右边聊天框里的信息，目前是hardcode的，你只要动态改变这个值就可以了
  private messages=[];

  constructor(private http: HttpService, private router: Router) {}

  // Get RongCloud ApiKey
  // getRongApiKey(): void {
  //   this.rongApiKey = 'c9kqb3rdki5pj';
  // }
  getUserList(){
    let msgs = this.getMessages();
    let id;
    console.log(msgs);
    this.userList=[];
    if(msgs.length>0){
      let lastMsg = msgs[msgs.length - 1];
      if(lastMsg.messageDirection==1){
        this.targetId = lastMsg.targetId;
      }else if(lastMsg.messageDirection==2){
        this.targetId = lastMsg.senderUserId;
      }
    }else{
      this.targetId='';
    }
    this.getCurrentMessages();
    let userSet = new Set();
    for(let i=msgs.length-1;i>=0;i--){
      if(msgs[i].messageDirection==1){
        id = msgs[i].targetId;
        console.log(id);
      }else if(msgs[i].messageDirection==2){
        id = msgs[i].senderUserId;
        console.log(id);
      }
      if (!userSet.has(id)) {
        userSet.add(id);
        this.userList.push(msgs[i]);
      }
    }
  }
  getCurrentMessages(){
    let msgs = this.getMessages();
    let id;
    this.messages=[];
    for(let i=0;i<msgs.length;i++){
      if(msgs[i].messageDirection==1){
        id = msgs[i].targetId;
      }else if(msgs[i].messageDirection==2){
        id = msgs[i].senderUserId;
      }
      if(id==this.targetId) {
        this.messages.push(msgs[i]);
      }
    }
  }

  changeUser(userId){
    //todo:用户点击左边list里的用户时触发的方法，你需要改变右边窗口里的信息
    this.targetId = userId;
    console.log(userId);
    this.getCurrentMessages();
  }
  sendMessage(message){
    let msg = new RongIMLib.TextMessage({
      content:message,
      user : {
        "id" : this.myId,
        "name": GlobalService.data.username,
        "icon": GlobalService.data.userImg
      },
    });
    let instance = RongIMLib.RongIMClient.getInstance();
    console.log(GlobalService.data.userId);
    console.log(this.targetId);
    instance.sendMessage(RongIMLib.ConversationType.PRIVATE, this.targetId, msg, {
      onSuccess: message => {
        console.log(message);
        this.setMessages(message,true);
      },
      onError: (errorCode, message) => {
        console.log(message);
        console.log(errorCode);
      }
    });
  }

  ngOnInit() {
    this.getUserList();
    // fetch from node.js backend to get RongCloud token
    this.rongTokenStr = localStorage.getItem('rongCloud_token');
    if(this.rongTokenStr==null) {
      this.http.getRongCloudToken().subscribe(
        data => {
          localStorage.setItem('rongCloud_token', data[0].message.toString());
          this.rongTokenStr = data[0].message.toString();
          this.initRongIM();
        },
        error => {
          alert(error);
        }
      );
    }else{
      this.initRongIM();
    }
  }
  // Init RongIMlib
  initRongIM() {
    let RongIMClient = RongIMLib.RongIMClient;
    RongIMClient.init(this.rongApiKey);
    RongIMClient.setConnectionStatusListener({
      onChanged: function (status) {
        switch (status) {
          case RongIMLib.ConnectionStatus.CONNECTED:
            console.log("connected!");
            break;
          case RongIMLib.ConnectionStatus.CONNECTING:
            console.log('I am working on connecting to RongCloud.');
            break;
          case RongIMLib.ConnectionStatus.DISCONNECTED:
            console.log('Disconnected');
            break;
        }
      }
    });

    RongIMClient.setOnReceiveMessageListener({
      onReceived: message => {
        this.setMessages(message,false);
        this.getUserList();
        this.getCurrentMessages();
      }
    });

    RongIMClient.connect(this.rongTokenStr, {
      onSuccess: userId => {
        console.log('connection success, userId:' + userId);
        this.instance = RongIMClient.getInstance();
        sendText();
      },
      onTokenIncorrect: function() {
        console.log('token invilide');
      },
      onError: function(errorCode) {
        let info = '';
        switch (errorCode) {
          case RongIMLib.ErrorCode.TIMEOUT:
            info = 'Over time';
            break;
          case RongIMLib.ErrorCode.UNKNOWN_ERROR:
            info = 'Unknown Error';
            break;
        }
        console.log(info);
      }
    });

    let sendText = function () {

    }
  }
  setMessages(message,isMyInput){
    message.isMyInput=isMyInput;

    let msgStr = localStorage.getItem(GlobalService.data.userId+"_msg");
    let msgObj;
    if(!msgStr){
      msgObj=[];
    }else{
      msgObj = JSON.parse(msgStr);
    }
    msgObj.push(message);
    localStorage.setItem(GlobalService.data.userId+"_msg",JSON.stringify(msgObj));
    this.messages.push(message);
  }

  getMessages(){
    let msgs = localStorage.getItem(GlobalService.data.userId+"_msg");
    if(!msgs){
      msgs='[]';
    }
    console.log(JSON.parse(msgs));
    return JSON.parse(msgs);
  }

}

// [
//   {
//     userId:string,
//     username:string,
//     avatar:string,
//     messages: [
//       {
//         type:string,
//         text:string,
//         isRead:boolean,
//         datetime:string
//       }
//     ]
//   }
// ]
