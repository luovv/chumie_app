import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'],
  providers: [HttpService]
})
export class CircleComponent implements OnInit {
  circleId: number;
  postNum: number;
  followersNum: number;

  constructor(private http: HttpService,private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      this.circleId = params['circleId'];
    });

    this.http.getCircleAdditionalInfo(this.circleId).subscribe(
        data => {
          this.postNum = data.post;
          this.followersNum = data.followers;
        },
        error => {
            alert(error);
        }
    );
  }

}
