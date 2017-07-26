import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

declare var Stripe: any;

@Component({
  selector: 'app-tickettest',
  templateUrl: './tickettest.component.html',
  styleUrls: ['./tickettest.component.css']
})
export class TickettestComponent implements OnInit {

  ticketNames: string[];
  ticketPrices: number[];
  ticketQuantities: number[];
  seats: any[];
  selectedSeatList: number[];
  //stripe: any;
  //elements: any;

  eventName = "event title";

  eventId = "595cf6e3362040fa495b7586";

  constructor(private http: HttpService) { }

  ngOnInit() {
    console.log(this.eventId);
    var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
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

    function setOutcome(result) {
      var successElement = document.querySelector('.success');
      var errorElement = document.querySelector('.error');
      successElement.classList.remove('visible');
      errorElement.classList.remove('visible');

      if (result.token) {
        // Use the token to create a charge or a customer
        // https://stripe.com/docs/charges
        successElement.querySelector('.token').textContent = result.token.id;
        successElement.classList.add('visible');
      } else if (result.error) {
        errorElement.textContent = result.error.message;
        errorElement.classList.add('visible');
      }
    }

    card.on('change', function(event) {
      setOutcome(event);
    });

    document.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      var form = document.querySelector('form');
      var extraDetails = {
        name: (<HTMLInputElement>form.querySelector('input[name=cardholder-name]')).value,
        username: (<HTMLInputElement>form.querySelector('input[name=user-name]')).value,
        useremail: (<HTMLInputElement>form.querySelector('input[name=user-email]')).value,
      };
      stripe.createToken(card, extraDetails).then(setOutcome);
    });

    this.http.getTicketInfo(this.eventId).subscribe(
        data => {
          console.log(data);

          console.log(data.name);

          this.ticketNames = data.name;
          this.ticketPrices = data.price;
          this.ticketQuantities = data.quantity;
          this.seats = data.seats;
          this.selectedSeatList = this.seats[0];

          console.log(this.seats);
          
        },
        error => {
            alert(error);
        }
    );
  }

  setOutcome (result) {
    var successElement = document.querySelector('.success');
    var errorElement = document.querySelector('.error');
    successElement.classList.remove('visible');
    errorElement.classList.remove('visible');

    if (result.token) {
      // Use the token to create a charge or a customer
      // https://stripe.com/docs/charges
      successElement.querySelector('.token').textContent = result.token.id;
      successElement.classList.add('visible');
    } else if (result.error) {
      errorElement.textContent = result.error.message;
      errorElement.classList.add('visible');
    }
  }

  // checkInArray(key) {
  //   return this.selectedSeats.indexOf(key) > -1;
  // }

  clickTicket(key) {
    this.selectedSeatList = this.seats[key];
    //this.selectedSeats = [];
  }

  buyTicket(key) {
    // if(this.selectedSeatList[key] == 0) {
    //   var index = this.selectedSeats.indexOf(key);
    //   if(index > -1) {
    //     this.selectedSeats.splice(index,1);
    //   }
    //   else {
    //     this.selectedSeats.push(key);
    //   }
    //   console.log(this.selectedSeats);
    // }

  }

}
