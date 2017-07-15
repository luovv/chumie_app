import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private searchText;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.searchText = params['searchText'];
        /*
         todo:用keyword搜索
         "/Activity/search/\(searchitem)/index/\(index)"

         "/Activity/searchUser/\(searchitem)/index/\(index)"

         "/Activity/searchCircle/\(searchitem)/index/\(index)"

         \(index)统一写100000 历史遗留问题
         */
      }
    )
  }

}
