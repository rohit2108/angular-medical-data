import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  //to store drug detail from json file
  drugData: any;
  //to store subscription
  subscribe: Subscription;
  //to store url
  private url = '/assets/drug.json';

  constructor(private http: HttpClient) {}

  /**
   * Angular Life cycle hook- ngOnInit
   */
  ngOnInit(): void {
    this.subscribe = this.http.get(this.url).subscribe((data: any) => {
      this.drugData = data.fields;
    });
  }

  /**
   * Angular Life cycle hook- ngOnDestory
   */
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
