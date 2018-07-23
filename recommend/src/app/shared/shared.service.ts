import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { APIURL } from './shared.redirect';

@Injectable()
export class SharedService {
  constructor (private http: Http, private router: Router, private appstate: AppState) {}

  logout () {
        // withCredentials: trueは必須.これがないとsessionが維持できない
        // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.get(APIURL + '/api/logout', { withCredentials: true })
        .subscribe(
          response => {
            this.appstate.isLogin = false;
          },
          error => {
            console.log(error);
          }
      );
  }
}
