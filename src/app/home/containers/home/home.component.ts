import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="service.getItems() | async as items">
      <div *ngFor="let item of items">
        <img [attr.src]="item.picture.thumbnail" alt="" >
        <br>
        {{ item.name.first }} {{ item.name.last }}
        <br>
        {{ item.email }}
        <br>
        {{ item.cell }}
      </div>
    </ng-container>
    <!--<pre>{{ service.getItems() | async }}</pre>-->
  `,
  styles: [`
    .avatar {
      float: left;
      padding: 10px;
      border: 1px solid hotpink;
    }
  `]
})
export class HomeComponent implements OnInit {
  public items: any[];
  constructor(public service: HomeService) {}

  ngOnInit() {
    this.service.getItems()
      .subscribe(res => {
        console.log('updating', res);
        this.items = res;
      });
  }
}
