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
  private userId: string;

  // join group
  private groupData = { groupid: '', groupname: ''};

  private num: number;

  groupUsers: any[] = [];
  // const message on top
  private message1 = 'Congratulations! You have paid your ticket successfully. For next step:';
  private message2 = 'you can join the group chat for this event.' +
  ' We will keep updating information in the chat, please make sure you stay connected. We send this receipt to your email please check your in/spam/trash box.';

  constructor(private router: Router, private http: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log("ajdasljdaskdla"+params);
      this.invoiceId = params['invoiceId'];
      localStorage.setItem('invoiceId', this.invoiceId);
      this.userId = params['userId'];
    });
    this.num = 1;
    this.http.getInvoice(this.invoiceId).subscribe(
      data => {
        this.payer = data.invoice.payer;
        this.date = data.invoice.date;
        this.title = data.invoice.title;
        this.amount_due = data.invoice.amount_due/100;
        this.num = data.num;
        this.groupId = data.invoice.chargeItemId;
        // for join group, later to chat
        //
        const n = data.users.length;
        for (let i = 0; i < n; i++) {
          this.groupUsers.push(
            { 'userName': data.users[i].username,
              'avatarImg': data.users[i].thumb
            });
        }
        this.groupData.groupid = this.groupId;
        this.groupData.groupname = this.title;
        this.joinGroup();
        console.log('GroupId:' + this.groupId);
        console.log(this.num);
        console.log(this.payer);
      },
      error => {
        console.log(error);
      }
    );
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

}
