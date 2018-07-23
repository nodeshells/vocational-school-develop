import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { APIURL } from '../shared/shared.redirect';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editprof',
  templateUrl: './editprof.component.html',
  styleUrls: ['./editprof.component.css']
})
export class EditprofComponent {
  images = [
    { path: './assets/prof/user1.png' },
    { path: './assets/prof/user2.png' },
    { path: './assets/prof/user3.png' },
    { path: './assets/prof/user4.png' },
    { path: './assets/prof/user5.png' },
    { path: './assets/prof/user6.png' },
    { path: './assets/prof/user7.png' },
    { path: './assets/prof/user8.png' },
    { path: './assets/prof/user10.png' },
    { path: './assets/prof/user11.png' },
    { path: './assets/prof/user12.png' },
    { path: './assets/prof/user13.png' },
    { path: './assets/prof/user14.png' },
    { path: './assets/prof/user16.png' },
    { path: './assets/prof/user17.png' }
  ];

  constructor (private http: Http, private router: Router) {}

  onSubmit (num: number) {
    let params = new URLSearchParams();
    params.set('picid', this.images[num].path);

    this.http.post(APIURL + '/api/updateIcon', params, { withCredentials: true })
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/contents/mypage']);
      },
      error => {
        console.log(error);
      });
  }

}
