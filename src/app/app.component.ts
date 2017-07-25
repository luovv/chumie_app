import { Component, OnInit } from '@angular/core';
import {GlobalService} from "./global.service";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlobalService]
})
export class AppComponent implements OnInit{
  constructor(private g:GlobalService, private translate:TranslateService){
    this.translate.addLangs(['en', 'cn']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  ngOnInit() {
    this.g.getUserInfo();
  }
}
