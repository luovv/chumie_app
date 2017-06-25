import { Component, Output, EventEmitter } from '@angular/core';
import {HttpService} from "../../http.service";
// import {Router} from "@angular/router";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['../nav.component.css'],
    providers: [HttpService]
})
export class SigninComponent{

    form = {email:'', password:''};
    // errorMsg = '';
    // invalid = false;
    @Output() switchView = new EventEmitter();
    @Output() closeSign = new EventEmitter();

    constructor(private http: HttpService) { }

    signin() {
        this.http.postSignin(this.form).subscribe(
            data => {
                alert(data);
                localStorage.setItem('id_token', data.message);
                localStorage.setItem('username', data.username);
                this.closeSign.emit();
                // localStorage.setItem('username', data.username);
                // var userInfo = {
                //     isSigned: true,
                //     id: data.id,
                //     username: data.username
                // };
                // ShareService.setUserInfo(userInfo);
                // this.router.navigate(['home']);
            },
            error => {
                alert(error);
                // this.errorMsg = error.json().msg;
                // this.invalid=true;
            }
        );
    }
    switchToSignup(){
        this.switchView.emit();
    }

}
