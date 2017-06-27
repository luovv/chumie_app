import { Component, Output, EventEmitter } from '@angular/core';
import {HttpService} from "../../http.service";
import {Router} from "@angular/router";
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

    constructor(private http: HttpService, private router:Router) { }

    signin() {
        this.http.postSignin(this.form).subscribe(
            data => {
                localStorage.setItem('id_token', data.message);
                localStorage.setItem('username', data.username);
                this.closeSign.emit();
                location.reload();
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
