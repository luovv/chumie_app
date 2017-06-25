import { Component, OnInit } from '@angular/core';
import "../../assets/js/jquery.magnific-popup.min.js";
import "../../assets/js/menubox.js";
declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    switch:boolean = true;
    constructor() { }

    ngOnInit() {

        //open popup
        $('.cd-popup-trigger').on('click', function(event){
            // event.preventDefault();
            $('.cd-popup').addClass('is-visible');
        });

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
    switchView(){
        this.switch = !this.switch;
    }
    closeSign(){
        $('.cd-popup').removeClass('is-visible');
    }

}
