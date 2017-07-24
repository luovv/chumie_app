import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

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
  selectedSeats: number[] = [];

  eventName = "event title";

  eventId = "595cf6e3362040fa495b7586";

  constructor(private http: HttpService) { }

  ngOnInit() {
    console.log(this.eventId);

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

  checkInArray(key) {
    return this.selectedSeats.indexOf(key) > -1;
  }

  clickTicket(key) {
    this.selectedSeatList = this.seats[key];
    this.selectedSeats = [];
  }

  buyTicket(key) {
    if(this.selectedSeatList[key] == 0) {
      var index = this.selectedSeats.indexOf(key);
      if(index > -1) {
        this.selectedSeats.splice(index,1);
      }
      else {
        this.selectedSeats.push(key);
      }
      console.log(this.selectedSeats);
    }
  }

}
