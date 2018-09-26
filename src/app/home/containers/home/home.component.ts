import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="items.length">
      <div *ngFor="let item of items" class="card">
        <img [attr.src]="item.picture.thumbnail" alt="" class="avatar">
        {{ item.name.first }} {{ item.name.last }}
        <br>
        {{ item.email }}
        <br>
        {{ item.cell }}
      </div>
    </ng-container>
  `,
  styles: [`
    .card {
      padding: 10px;
      margin: 10px;
      border: 1px solid hotpink;
    }
    .avatar {
      float: left;
      /*padding: 10px;*/
      margin: 3px 10px 3px 0;
    }
  `]
})
export class HomeComponent implements OnInit {
  public items: any[] = [];
  constructor(public service: HomeService) {}

  ngOnInit() {
    this.service.getItems()
      .subscribe(res => {
        console.log('Result', res);
        this.items = res;
      });
  }
}
