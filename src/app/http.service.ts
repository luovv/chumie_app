/**
 * Created by vv on 23/06/2017.
 */

import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpService {
    // private host = 'http://127.0.0.1:8000/';
    host = 'http://www.chumi.co';
    constructor(private http:Http) { }

    postSignin(data){
        var url = this.host+'/member/login';
        return this.http.post(url, data).map(
            res => res.json()
        );
    }

  postSignup(data){
    var url = this.host+'/member/regNoInvite';
    return this.http.post(url, data).map(
      res => res.json()
    );
  }

  postCheckDuplicateEmail(data){
    var url = this.host+'/member/checkEmailDuplicate';
    return this.http.post(url, data).map(
      res => res.json()
    );
  }

    //
    // getVerify(){
    //     var url = this.host+'api/getCurrUser';
    //
    //     var token = localStorage.getItem('id_token');
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Authorization', "JWT "+token);
    //     return this.http.get(url, {headers: headers}).map(
    //         res => res.json()
    //     );
    // }
    //
    // getAlbumList(search=null){
    //     if(search) {
    //         var url = this.host + 'api/album/?search='+search+'&ordering=-created';
    //     }else{
    //         var url = this.host + 'api/album/'+'?ordering=-created';
    //     }
    //
    //     return this.http.get(url).map(
    //         res => res.json()
    //     );
    // }
    // getAlbumListByUser(uid){
    //     var url = this.host+'api/album/?uid='+uid;
    //
    //     return this.http.get(url).map(
    //         res => res.json()
    //     );
    // }
    // postSignin(data){
    //     var url = this.host+'signin/';
    //
    //     return this.http.post(url, data).map(
    //         res => res.json()
    //     );
    // }
    //
    // postSignup(data){
    //     var url = this.host+'signup/';
    //     return this.http.post(url, data).map(
    //         res => res.json()
    //     );
    // }
    //
    // postCreateAlbum(data){
    //     var url = this.host+'api/album/create/';
    //     var token = localStorage.getItem('id_token');
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Authorization', "JWT "+token);
    //     return this.http.post(url, data, {headers: headers}).map(
    //         res => res.json()
    //     );
    // }
    // deleteAlbum(id){
    //     var url = this.host+'api/album/'+id+'/';
    //     var token = localStorage.getItem('id_token');
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Authorization', "JWT "+token);
    //     return this.http.delete(url, {headers: headers}).map(
    //         res => res.json()
    //     );
    // }
    //
    // postCreateImage(data){
    //     var url = this.host+'api/image/create/';
    //
    //     var token = localStorage.getItem('id_token');
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Authorization', "JWT "+token);
    //
    //     return this.http.post(url, data, {headers: headers}).map(
    //         res => res.json()
    //     );
    // }
}
