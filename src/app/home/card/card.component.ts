import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../http.service";
import {ActivatedRoute, Params} from "@angular/router";
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [HttpService]
})
export class CardComponent implements OnInit {
  userInfo:any;
  data:any;
  imgHost:string;
  constructor(private http: HttpService,private route: ActivatedRoute, private g:GlobalService) { }

  ngOnInit() {
    this.imgHost = this.http.imghost;
    this.userInfo = GlobalService.data;
    // this.getData();

    this.g.dataChange.subscribe((value) => {
      console.log(value);
      this.userInfo = value;
      this.getData();
    });
  }

  getData(){
    this.http.getFeedFromTag(0, this.userInfo.language, this.userInfo.location.lat, this.userInfo.location.long, Date.now(),this.userInfo.tags, 1).subscribe(
      data => {
        this.data = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
