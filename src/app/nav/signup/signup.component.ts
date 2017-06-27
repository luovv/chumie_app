import {Component, Output, EventEmitter} from '@angular/core';
import {HttpService} from "../../http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../nav.component.css'],
  providers: [HttpService]
})
export class SignupComponent{

    form = {email:'', password:'', Systemlanguage:''};
    errorMsg = '';
    @Output() switchView = new EventEmitter();
    @Output() closeSign = new EventEmitter();

    constructor(private http: HttpService, private router:Router) { }

    signup() {
        var userLang = navigator.language;
        if(userLang.includes('CN')){
            this.form['Systemlanguage']='Chinese';
        }else{
            this.form['Systemlanguage']='English';
        }

        alert(userLang);
        this.http.postSignup(this.form).subscribe(
            data => {
                if(data[0].status=='error'){
                    this.errorMsg=data[0].message;
                }else {
                    localStorage.setItem('id_token', data[0].message);
                    localStorage.setItem('username', data[0].username);
                    this.closeSign.emit();
                }
                this.router.navigate(['']);
            },
            error => {
                alert(error);
            }
        );
    }
    switchToSignin(){
      this.switchView.emit();
    }

}
