import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [ HttpService ],
})
export class InvoiceComponent implements OnInit {

  private invoiceId = '';//'596c2ed653db18ff704783b7';
  private payer: string = '';
  private nowDate = new Date();
  private date: Date;
  private amount_due: number;
  private payTo: string;
  private title: string;
  private groupId: string;

  private num: number;
  // const message on top
  private message1 = 'Congratulations! You have paid your ticket successfully.';
  private message2 = 'For next step, you can join the group chat for this event.' +
  ' We will keep updating information in the chat, please make sure you stay connected.';

  constructor(private router: Router, private http: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log(params);
      this.invoiceId = params['invoiceId'];
    });
    this.http.getInvoice(this.invoiceId).subscribe(
      data => {
        this.payer = data.invoice.payer;
        this.date = data.invoice.date;
        this.title = data.invoice.title;
        this.amount_due = data.invoice.amount_due;
        this.num = data.num;
        this.groupId = data.invoice.chargeItemId;
        console.log('GroupId:' + this.groupId);
        console.log(this.num);
        console.log(this.payer);
      },
      error => {
        alert(error);
      }
    );
  }

}
