import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from "../http.service";
import { GlobalService } from '../global.service'
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import { Title }     from '@angular/platform-browser';

declare var Stripe: any;
declare var $: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  //events
  content: string;
  postDate: string;
  title: string;
  creatorName: any;
  creatorIcon: string;
  cover: string;
  views: number;
  images: string[];
  tags: string[];
  comments: any[];
  commentsCount: number;
  liksCount: number;
  eventStartTime: string;
  price: number;
  priceText: string;
  isFree: boolean;

  paymentModel = { email: '', name: ''};
  joinModel = { email: '', name: ''};


  // join group
  private groupData = { groupid: '', groupname: ''};

  //payment

  form = {username:'', group:'', price:-1, orginalPrice:-1, seatIndex:-1, stripeEmail:'', stripeToken: '', Systemlanguage: ''};
  freeForm = {stripeEmail: '', Systemlanguage: '', username: ''};

  ticketNames: string[];
  ticketPrices: number[];
  ticketQuantities: number[];
  seats: any[];
  selectedSeatList: number[];

  selectedListIndex: number;
  selectedSeat: number;
  userLanguage: string;
  userEmail : string;
  username : string;
  validCard: boolean;

  eventId: string;

  photoServerUrl = "https://dhjjgq45wu4ho.cloudfront.net/";

  //eventName = "event title";

  constructor( private g: GlobalService, private http: HttpService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }
  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {

    this.validCard = false;

    this.route.params.forEach((params: Params) => {
      this.eventId = params['postId'];

      console.log("id: " + this.eventId);
    });

    this.http.getEventInfo(this.eventId).subscribe(
        data => {
          this.content = data.content;
          console.log(this.content);
          this.postDate = data.postDate;
          this.title = data.title;
          this.setTitle(this.title);
          this.creatorIcon = this.photoServerUrl + data._creator.userPhoto;
          this.cover = this.photoServerUrl + data.cover;
          this.views = data.viewers;

          this.creatorName = data._creator.username;
          this.images = data.image;
          if (this.images.length > 8) {
            this.images = this.images.slice(0, 8);
          }
          this.tags = data.tags;

          this.liksCount = data.likes.length;
          this.eventStartTime = data.DeadTime;
          this.price = data.price;

          if (this.price > 0) {
            this.priceText = "参与价格： $" + this.price;
            this.isFree = false;
          } else {
            this.priceText = "本活动免费";
            this.isFree = true;
          }

          console.log(data);
          console.log(this.images);

        },
        error => {
            alert(error);
        }
    );

    this.http.getComments(this.eventId).subscribe(
        data => {
          this.comments = data;
          this.commentsCount = data.length;
          console.log(data);

        },
        error => {
            alert(error);
        }
    );

    if(navigator.language == "zh-CN") {
      this.userLanguage = "Chinese";
    }
    else {
      this.userLanguage = "English";
    }

    var stripe = Stripe('pk_test_rOjv2jSQZRDSKTgc6pTan9jJ');
    var elements = stripe.elements();

    var card = elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '40px',
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '15px',

          '::placeholder': {
            color: '#CFD7E0',
          },
        },
      }
    });
    card.mount('#card-element');

    var setOutcome = result => {
      var errorElement = document.querySelector('.error');
      errorElement.classList.remove('visible');

      if (result.token) {
        // Use the token to create a charge or a customer
        // https://stripe.com/docs/charges
        // successElement.querySelector('.token').textContent = result.token.id;
        // successElement.classList.add('visible');

        //console.log(this.form);

        var originalPrice = this.ticketPrices[this.selectedListIndex] * 100;

        this.form['group'] = this.eventId;
        this.form['username'] = this.username;
        this.form['price'] = originalPrice + Math.floor((originalPrice * 0.029 + 30)/(1-0.029));
        this.form['orginalPrice'] = originalPrice;
        this.form['seatIndex'] = this.selectedSeat;
        this.form['stripeEmail'] = this.userEmail;
        this.form['stripeToken'] = result.token.id;
        this.form['Systemlanguage'] = this.userLanguage;

        this.http.chargeCard(this.form).subscribe(
            data => {
                console.log(data);
                console.log(data.invoiceId);
                //支付成功跳转 invoice/:invoiceId
              let userId = data.userId;
              localStorage.setItem('id_token', userId);
              this.closeAllModal();
              this.g.getUserInfo();
              GlobalService.data.userId = data.userId;
              this.joinGroup();
              // this.router.navigateByUrl(`/chat/user/${userId}/group/${this.eventId}`);
              this.router.navigateByUrl(`/invoice/${data.invoiceId}/user/${userId}`);
                this.closeAllModal();
            },
            error => {
                alert(error);
            }
        );

      } else if (result.error) {
        errorElement.textContent = result.error.message;
        errorElement.classList.add('visible');
      }
    }

    card.on('change', function(event) {
      setOutcome(event);
    });

    document.querySelector('.payform').addEventListener('submit', function(e) {
      e.preventDefault();
      var theform = document.querySelector('.payform');
      var extraDetails = {
        name: (<HTMLInputElement>theform.querySelector('input[name=cardholder-name]')).value,
        useremail: (<HTMLInputElement>theform.querySelector('input[name=user-email]')).value,
      };
      stripe.createToken(card, extraDetails).then(setOutcome);
    });

    this.groupData.groupid = this.eventId;
    this.groupData.groupname = this.title;


  }

  clickTicket(key) {
    this.selectedSeatList = this.seats[key];
    this.selectedListIndex = key;
    //this.selectedSeats = [];
  }

  buyTicket(key) {

    this.selectedSeat = key;
  }

  onKeyEmail(event: any) { // without type info
    this.userEmail = event.target.value;
  }

  onKeyUsername(event: any) { // without type info
    this.username = event.target.value;
  }

  joinEvent() {
    this.http.getTicketInfo(this.eventId).subscribe(
        data => {
          this.ticketNames = data.name;
          this.ticketPrices = data.price;
          this.ticketQuantities = data.quantity;
          this.seats = data.seats;
          this.selectedSeatList = this.seats[0];
          console.log(this.ticketPrices);
        },
        error => {
            alert(error);
        }
      );
  }

  joinEventFree(){

  }

  closeAllModal() {
    $('.modal').modal('hide');
  }

  joinGroup() {
    this.http.joinGroup(this.groupData).subscribe(
      data => {
        console.log('join group successfully!');
      },
      error => {
        console.log('Join group error');
      }
    );
  }

  submitJoinFree() {
    this.freeForm['username'] = this.username;
    this.freeForm['stripeEmail'] = this.userEmail;
    this.freeForm['Systemlanguage'] = this.userLanguage;

    this.http.joinEventFree(this.freeForm).subscribe(
            data => {
                console.log(data);
                let userId = data.userId;
                localStorage.setItem('id_token', userId);
                this.closeAllModal();
                this.g.getUserInfo();
                GlobalService.data.userId = data.userId;
                this.joinGroup();
                this.router.navigateByUrl(`/chat/user/${userId}/group/${this.eventId}`);
            },
            error => {
                // alert(error);
                console.error('Error:' + error);
            }
        );
  }

}

