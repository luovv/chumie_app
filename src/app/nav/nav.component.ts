import { Component, OnInit, Input } from '@angular/core';
import "../../assets/js/jquery.magnific-popup.min.js";
import "../../assets/js/menubox.js";
import {HttpService} from "../http.service";
import {GlobalService} from "../global.service";
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
    isSigned:boolean = false;
    hideNavTabClass: string;
    hideNavTabHeightClass: string;
    @Input() hideNavTab: boolean = false;
    constructor(private http: HttpService, private g:GlobalService) { }

    ngOnInit() {

        //todo:把class控制显示改成ngIf
        this.hideNavTabClass = "";
        this.hideNavTabHeightClass = "";
        if(this.hideNavTab) {
            this.hideNavTabClass = "hide-nav-tab";
            this.hideNavTabHeightClass = "hide-nav-tab-height";
        }
        this.g.dataChange.subscribe((value) => {
          this.userInfo = value;
        });

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

}
