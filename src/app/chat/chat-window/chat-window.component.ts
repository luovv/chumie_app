import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnChanges {
  @Input() targetId: string;
  constructor() { }

  ngOnChanges(changes: any) {
    //todo:当targetid有变化的时候就出发这个方法，然后通过changes.targetId.currentValue获得新的targetid
    console.log(changes.targetId.currentValue);
  }

  ngOnInit() {
  }

}
