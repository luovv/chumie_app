import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import '../../assets/js/RongIMLib-2.2.5.min.js';
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
  private targetId = '123';

  constructor(private http: HttpService, private router: Router) {}

  // Get RongCloud ApiKey
  // getRongApiKey(): void {
  //   this.rongApiKey = 'c9kqb3rdki5pj';
  // }

  ngOnInit() {
    // fetch from node.js backend to get RongCloud token
    this.rongTokenStr = localStorage.getItem('rongCloud_token');
    if(this.rongTokenStr=='') {
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

  getConversationList(){
    // let userInfo = {
    //   appKey:this.rongApiKey,
    //   token:this.rongTokenStr
    // };
    // init(userInfo,{
    //   Success: id => {
    //     alert(id);
    //   }
    // });
    // this.instance.getConversationList({
    //   onSuccess: function (conversations) {
    //     console.log(conversations);
        // transConversations(conversations, function (translatedConversations) {
        //   //处理完成后，渲染会话列表
        //   renderConversationView(translatedConversations,instance);
        // })
      // }
    // }, null);
  }
  // Init RongIMlib
  initRongIM(): void {
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
      onReceived: function (message) {
        switch (message.messageType) {
          case RongIMClient.MessageType.TextMessage:
            // message.content.content => 消息内容
            console.log('Get a new message: ' +  message.content.content);
            break;
          case RongIMClient.MessageType.VoiceMessage:
            // 对声音进行预加载
            // message.content.content 格式为 AMR 格式的 base64 码
            break;
          case RongIMClient.MessageType.ImageMessage:
            // message.content.content => 图片缩略图 base64。
            // message.content.imageUri => 原图 URL。
            break;
          case RongIMClient.MessageType.DiscussionNotificationMessage:
            // message.content.extension => 讨论组中的人员。
            break;
          case RongIMClient.MessageType.LocationMessage:
            // message.content.latiude => 纬度。
            // message.content.longitude => 经度。
            // message.content.content => 位置图片 base64。
            break;
          case RongIMClient.MessageType.RichContentMessage:
            // message.content.content => 文本消息内容。
            // message.content.imageUri => 图片 base64。
            // message.content.url => 原图 URL。
            break;
          case RongIMClient.MessageType.InformationNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.ContactNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.ProfileNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.CommandNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.CommandMessage:
            // do something...
            break;
          case RongIMClient.MessageType.UnknownMessage:
            // do something...
            break;
          default:
            // do something...
            break;
        }
      }
    });

    RongIMClient.connect(this.rongTokenStr, {
      onSuccess: userId => {
        console.log('connection success, userId:' + userId);
        this.instance = RongIMClient.getInstance();
        // sendText();
        this.getConversationList();
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
      let content = {
        content:"Hello, This test message from Angular 2 web client! ",
        user : {
          "userId" : '56a196aa1c29a74f74ccdf91',
          'name' : 'kdjdkk'
        },
        extra: {}
      };

      let msg: any = new RongIMLib.TextMessage(content);
      let conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
      let targetId = '56a196aa1c29a74f74ccdf91';
      let instance = RongIMClient.getInstance();

      instance.sendMessage(conversationtype, targetId, msg, {
        onSuccess: function (message) {
          console.log("发送文字消息成功");

        },
        onError: function (errorCode, message) {
          console.log('发送文字 failed!!!' + message);
          console.log(errorCode);
        }
      });
    }


  }

  // sendTextMessage(instance: any): void {
  //   let content = {
  //     content:"Hello, This test message from Angular 2 web client! ",
  //     user : {
  //       "userId" : "56a196aa1c29a74f74ccdf91",
  //       "name" : "Michael"
  //     },
  //     extra:{
  //       "name":"name",
  //       "age" : 12
  //     }
  //   };
  //
  //   let msg = RongIMLib.TextMessage(content);
  //   instance.sendMessage(RongIMLib.ConversationType.PRIVATE, content.user.userId, content.content, {
  //     onSuccess: function (message) {
  //       console.log("发送文字消息成功");
  //
  //     },
  //     onError: function (errorCode,message) {
  //      console.log('发送文字 failed!!!');
  //     }
  //   });
  //
  //
  // }
  changeTargetId(){
    this.targetId='456';
  }


}
