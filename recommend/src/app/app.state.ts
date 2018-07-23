import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { APIURL } from './shared/shared.redirect';

@Injectable()
export class AppState {
  public isUser: String = '';
  public isLogin: Boolean;

  constructor (private http: Http) {
    this.checksession();
  }

  ngOninit () {
    this.checksession();
  }

  checksession () {
    this.http.get(APIURL + '/api/checksession', { withCredentials: true })
        .subscribe(
          response => {
            // 受け取ったセッション情報をjson化して変数に格納する。
            const resp = response.json();
            if (resp.user !== undefined) {
              this.isLogin = true;
            } else if (resp.user === undefined) {
              this.isLogin = false;
            }
          },
          error => {
            console.log(error);
          }
        );
  }
}
