import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import 'rxjs/add/operator/toPromise';
import { APIURL } from '../shared.redirect';

@Injectable()
export class AuthguardService implements CanActivate {
  constructor (private router: Router, private http: Http, private appstate: AppState) {
  }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // テスト用に認証無効
    return this.checksession();
  }

  checksession (): Observable<boolean> {
    return this.http.get(APIURL + '/api/checksession', { withCredentials: true })
        .map(
          response => {
            // 受け取ったセッション情報をjson化して変数に格納する。
            const resp = response.json();
            if (resp.user !== undefined) {
              this.appstate.isLogin = true;
            } else if (resp.user === undefined) {
              this.appstate.isLogin = false;
            }
            if (this.appstate.isLogin === true) {
              return true;
            }else if (this.appstate.isLogin === false) {
              this.router.navigate(['cert/login']);
              return false;
            }
          },
          error => {
            console.log(error);
          }
        );
  }
}

// ログイン済みなのにlogin及びregisterにアクセスした場合
@Injectable()
export class AuthguardService2 implements CanActivate {
  constructor (private router: Router, private http: Http, private appstate: AppState) {
  }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.checksession();
  }

  checksession (): Observable<boolean> {
    return this.http.get(APIURL + '/api/checksession', { withCredentials: true })
        .map(
          response => {
            // 受け取ったセッション情報をjson化して変数に格納する。
            const resp = response.json();
            if (resp.user !== undefined) {
              this.appstate.isLogin = true;
            } else if (resp.user === undefined) {
              this.appstate.isLogin = false;
            }
            if (this.appstate.isLogin === true) {
              this.router.navigate(['contents/mypage']);
              return false;
            }else if (this.appstate.isLogin === false) {
              return true;
            }
          },
          error => {
            console.log(error);
          }
        );
  }
}
