import { Component, OnInit } from '@angular/core';
import "../../assets/js/jquery.magnific-popup.min.js";
import "../../assets/js/menubox.js";
import {HttpService} from "../http.service";
declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [HttpService]
})
export class NavComponent implements OnInit {
    switch:boolean = true;
    img:string;
    isSigned:boolean = false;
    constructor(private http: HttpService) { }

    ngOnInit() {
        this.http.getBasicInfo().subscribe(
            data => {
                if(data.email){
                    this.img = data.userPhoto;
                    this.isSigned = true;
                }else{
                    this.isSigned = false;
                }
            },
            error => {
                alert(error);
            }
        );

        //close popup
        $('.cd-popup').on('click', function(event){
            if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
                // event.preventDefault();
                $(this).removeClass('is-visible');
            }
        });
        //close popup when clicking the esc keyboard button
        $(document).keyup(function(event){
            if(event.which=='27'){
                $('.cd-popup').removeClass('is-visible');
            }
        });
    }
    openSignIn(){
        $('.cd-popup').addClass('is-visible');
    }
    switchView(){
        this.switch = !this.switch;
    }
    closeSign(){
        $('.cd-popup').removeClass('is-visible');
    }
    logout(){
        this.http.postLogout().subscribe(
            data => {
                this.isSigned = false;
            },
            error => {
                alert(error);
            }
        );
    }

}
