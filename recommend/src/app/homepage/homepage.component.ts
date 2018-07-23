import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  resp = '';
  queryParams: any;

  constructor (private _activatedRoute: ActivatedRoute,
    private _router: Router) {}

  ngOnInit () {
    this._activatedRoute.queryParams.subscribe(
      params => {
        this.queryParams = params;
        this.resp = this.queryParams.status;
      });
  }
}
