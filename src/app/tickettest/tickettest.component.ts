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
  selectedSeat: number[];

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
          this.selectedSeat = this.seats[0];

          console.log(this.seats);
          
        },
        error => {
            alert(error);
        }
    );
  }

  clickTicket(index) {
    this.selectedSeat = this.seats[index];
  }

}
