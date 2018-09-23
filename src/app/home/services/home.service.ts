import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const STATE_KEY: StateKey<any> = makeStateKey('home');

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private state: TransferState
  ) {
  }

  public getItems(): Observable<any> {
    if (this.state.hasKey(STATE_KEY)) {
      console.log('Loading from State');
      return of(this.state.get(STATE_KEY, []));
    }
    console.log('Loading from API');
    return this.http.get<{ results: any[] }>('https://randomuser.me/api?results=5')
      .pipe(
        tap(res => this.state.set(STATE_KEY, res.results)),
      );
  }
}
