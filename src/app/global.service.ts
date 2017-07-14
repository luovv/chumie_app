/**
 * Created by vv on 13/07/2017.
 */

import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Subject} from "rxjs";

@Injectable()
export class GlobalService{
  public static data = {
    isSigned: false,
    userImg: '',
    userId:'',
    email:'',
    tags:['all'],
    language:'English',
    location:{
      lat:0,
      long:0,
    }
  };
  dataChange: Subject<any> = new Subject<any>();

  constructor(private http: HttpService) { }

  getUserInfo(){
    var uid = localStorage.getItem('id_token');
    if(uid) {
      this.http.getUserInfo(uid).subscribe(
        data => {
          if (data.email) {
            GlobalService.data.isSigned = true;
            GlobalService.data.userImg = this.http.imghost + "/" + data.userPhoto;
            GlobalService.data.email = data.email;
            GlobalService.data.tags = data.tags;
            GlobalService.data.language = data.language;
            navigator.geolocation.getCurrentPosition(function (position) {
              GlobalService.data.location.lat = position.coords.latitude;
              GlobalService.data.location.long = position.coords.longitude;
              console.log(position.coords.longitude);
            });

          } else {
            GlobalService.data.isSigned = false;
          }
          console.log(data);
          this.dataChange.next(GlobalService.data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  logout(){
    this.http.postLogout().subscribe(
      data => {
        localStorage.setItem('id_token', '');
        GlobalService.data.isSigned = false;
        this.dataChange.next(GlobalService.data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
