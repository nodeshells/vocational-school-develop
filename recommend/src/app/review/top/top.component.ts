import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { FormControl,FormBuilder,FormGroupDirective,NgForm,FormArray,Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { APIURL } from '../../shared/shared.redirect';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {
  searched ;
  avatar = './assets/user1/user1_profile.jpg';
  items = [];
  Popular = {
    id: 'test',
    name: '人気ユーザー',
    uday: '2018-1-24T32',
    title: '今流行のあのアイテム',
    improvement: '今流行のあのアイテムがついに日本で発売される事になりました。今回はそのアイテムについてレビューしていこうと思います。',
    star: 4
  };
  categories = [
    '本・コミック・雑誌',
    'ゲーム',
    'ミュージック',
    '映像作品(映画・アニメ・ドラマ)',
    '電化製品',
    'ヘルス&ビューティー',
    '食品・飲料・お酒',
    '車・バイク',
    '家庭用品・家具',
    '小物・雑貨',
    'おもちゃ・ホビー',
    '衣類',
    'スポーツ・アウトドア',
    'イベント',
    'その他'
  ];
  cateSeachForm: FormGroup;
  constructor (private http: Http,private builder: FormBuilder) {
    this.onLoad();
    this.cateSeachForm = this.builder.group({
      category : new FormControl('', []),
      keyword : new FormControl('', []),
      tag : new FormControl('', [])
    });
  }
  // 星の数を表示するためのメソッド
  createstar = num => new Array(num);

  toLocaleString ( date ) {
    let arr = date.split('-');
    let arr2 = arr[2].split('T');
    // let dataJoin = arr.join
    return arr[0] + '/' + arr[1] + '/' + arr2[0];
  }

  onLoad () {
    this.http.get(APIURL + '/api/reviewtop', { withCredentials: true })
    .subscribe(
      response => {
        // レビューの一覧を取得して最新順にしてある。
        this.items = response.json();
      },
      error => {
        console.log(error);
      });
  }

  onSubmit_keyword () {
    const ps = new URLSearchParams();
    ps.set('keyword', this.cateSeachForm.controls.keyword.value);

    this.http.get(APIURL + '/api/searchkeyword', { params: ps , withCredentials: true })
    .subscribe(
      response => {
        this.items = response.json();
        console.log(this.searched);
      },
      error => {
        console.log(error);
      });
  }

  onSubmit_tag () {
    this.http.get(APIURL + '/api/searchtag?tag=' + JSON.stringify(this.cateSeachForm.controls.tag.value), { withCredentials: true })
    .subscribe(
      response => {
        this.items = response.json();
      },
      error => {
        console.log(error);
      });
  }

  onSubmit_cate () {
    this.http.get(APIURL + '/api/searchcate?cate=' + this.cateSeachForm.controls.category.value , { withCredentials: true })
  .subscribe(
      response => {
        this.items = response.json();
      },
      error => {
        console.log(error);
      });
  }
}
