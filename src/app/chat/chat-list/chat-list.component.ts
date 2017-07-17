import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  @Input() userList = [];
  @Output() changeUser = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }
  isActiveUser(i){
    if(i.activeUser){
      return "#e2e2e2";
    }else{
      return "#fff";
    }
  }

  clickChangeUser(i){
    for(let i=0;i<this.userList.length;i++){
      this.userList[i].activeUser=false;
    }
    i.activeUser=true;
    this.changeUser.emit(i.userId);
  }
}
