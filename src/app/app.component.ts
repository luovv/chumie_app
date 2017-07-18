import { Component, OnInit } from '@angular/core';
import {GlobalService} from "./global.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlobalService]
})
export class AppComponent implements OnInit{
  constructor(private g:GlobalService){ }
  ngOnInit() {
    this.g.getUserInfo();
  }
}
