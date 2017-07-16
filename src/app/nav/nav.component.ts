import { Component, OnInit, Input } from '@angular/core';
import "../../assets/js/jquery.magnific-popup.min.js";
import "../../assets/js/menubox.js";
import {HttpService} from "../http.service";
import {GlobalService} from "../global.service";
import {Router} from "@angular/router";
declare var $: any;

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    providers: [HttpService]
})
export class NavComponent implements OnInit {
    userInfo=GlobalService.data;
    switch:boolean = true;
    img:string;
    hideNavTabClass: string;
    hideNavTabHeightClass: string;
    @Input() subNav: boolean = false;

    private searchText='';

    constructor(private http: HttpService, private g:GlobalService, private router:Router) { }

    ngOnInit() {

        //todo:把jquery改成ng2
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
        this.g.logout();
    }
    search(){
        this.router.navigate(['search/'+this.searchText]);
    }
    navToMessage(){
      this.router.navigate(['center/message']);
    }
    navToFriend(){
      this.router.navigate(['center/friend']);
    }
    navToCreate(){
      this.router.navigate(['create']);
    }

}
