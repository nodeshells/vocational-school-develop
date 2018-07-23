import { Component, Inject, Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { APIURL } from '../shared/shared.redirect';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  providers: [SharedService]
})
@Injectable()
export class MypageComponent {
  items: any= [];
  avatar = './assets/user1/user1_profile.jpg';
  name = '';
  user = {};
  archives = [];
  queryParams: any;
  outlook: any;

  constructor (private sharedservice: SharedService, private http: Http, private router: Router, private activatedRoute: ActivatedRoute) {
    this.onLoad();
  }

  onLoad () {
    this.queryRead().subscribe((id) => {
      const nonquery = '/api/mypage';
      let withquery = '/api/mypage?id=';
      let useurl = '';
      if (id !== undefined) {
        useurl = withquery + id;
        this.outlook = true;
      }else {
        useurl = nonquery;
        this.outlook = false;
      }
      this.http.get(APIURL + useurl, { withCredentials: true })
    .subscribe(
      response => {
        this.items = response.json();
        this.user = this.items;
        this.archives = this.items.review;
      },
      error => {
        console.log(error);
      });
    });
  }

  queryRead (): Observable<string> {
    return this.activatedRoute.queryParams.map(
      params => {
        let queryParams = params;
        return queryParams.id;
      });
  }

}
