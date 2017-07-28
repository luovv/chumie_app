import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
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

  private rongApiKey = 'c9kqb3rdki5pj';
  private rongTokenStr: any;
  private instance:any;
  private isMobile = false;

  private isChat = true;

  private userList = [];
  private messages = [];
  private friendList = [];

  private target = {
    id:'',
    name:'',
    icon:''
  };
  private my = {
    id: GlobalService.data.userId,
    name: GlobalService.data.username,
    icon: GlobalService.data.userImg
  };

  constructor(private http: HttpService, private router: Router, private g:GlobalService, private route: ActivatedRoute) {}

  updateConvList(){
    let m = this.getMessages();
    this.userList = m.slice().reverse();
  }
  updateMessageWindow(){
    let m = this.getMessages();
    this.messages=[];
    for(let i=0;i<m.length;i++){
      if(m[i].target.id==this.target.id){
        this.messages = m[i].messages;
      }
    }
  }
  changeUser(target){
    this.target = target;
    this.updateMessageWindow();
  }

  sendMessage(message){
    let msg = new RongIMLib.TextMessage({
      content:message,
      user : this.my,
    });
    let instance = RongIMLib.RongIMClient.getInstance();
    instance.sendMessage(RongIMLib.ConversationType.PRIVATE, this.target.id, msg, {
      onSuccess: message => {
        this.setMessages(message,this.target);
      },
      onError: (errorCode, message) => {
        console.log(message);
        console.log(errorCode);
      }
    });
  }

  ngOnInit() {
    let agent = window.navigator.userAgent;
    this.route.params.forEach((params: Params) => {
      this.target.id = params['userId'];
      this.updateMessageWindow();
      if(params['groupId']){
        this.http.getActivityById(params['groupId']).subscribe(
          data => {
            console.log(data);
            let info={
              groupid:params['groupId'],
              groupname:data.title
            };
            this.http.joinGroup(info).subscribe(
              result => {
                this.target={
                  id:params['groupId'],
                  name:data.title,
                  icon:''
                };
                this.updateMessageWindow();
              },
              error => {
                alert(error);
              }
            );
          },
          error => {
            alert(error);
          }
        );
      }
    });

    if(agent.toLowerCase().includes('iphone') || agent.toLowerCase().includes('android')){
      this.isMobile = true
    }

    this.g.dataChange.subscribe((value) => {
      this.my = {
        id:value.userId,
        name:value.username,
        icon:value.userImg
      };
    });

    this.updateConvList();
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
        this.setMessages(message,message.content.user);
      }
    });

    RongIMClient.connect(this.rongTokenStr, {
      onSuccess: userId => {
        console.log('connection success, userId:' + userId);
        this.instance = RongIMClient.getInstance();
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

    this.http.getFriends().subscribe(
      data => {
        this.friendList=data;
        console.log(data);
      },
      error => {
        alert(error);
      }
    );
  }
  setMessages(message,t){
    let msgStr = localStorage.getItem(GlobalService.data.userId+"_msg");
    let msgObj=((!msgStr) ? []:JSON.parse(msgStr));
    let flag=false;
    for(let i=0;i<msgObj.length;i++){
      if(msgObj[i].target.id==t.id){
        if(message) {
          msgObj[i].messages.push(message);
        }
        flag=true;
      }
    }
    if(message){
      message=[message];
    }else{
      message=[];
    }
    if(!flag){
      msgObj.push({
        target:t,
        messages:message
      })
    }
    localStorage.setItem(GlobalService.data.userId+"_msg",JSON.stringify(msgObj));
    this.updateConvList();
    this.updateMessageWindow();
  }

  getMessages(){
    let msgs = localStorage.getItem(GlobalService.data.userId+"_msg");
    if(!msgs){
      msgs='[]';
    }
    return JSON.parse(msgs);
  }
  clickFriend(){
    this.isChat = false;
  }

  clickChat(){
    this.isChat = true;
  }

  triggerMessage(user){
    let t = {
      id:user._id,
      name:user.username,
      icon:user.userPhoto
    };
    this.target = t;
    this.setMessages(null,t);
    this.isChat = true;
  }
}
