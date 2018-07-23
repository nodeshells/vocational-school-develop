import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormControl,FormBuilder,FormGroupDirective,NgForm,Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { AppState } from '../app.state';
import { APIURL } from '../shared/shared.redirect';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  responseJson = '';
  replace= RegExp(/"/,'g');
  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor (private http: Http,private builder: FormBuilder, private router: Router, private appstate: AppState) {
    this.loginForm = this.builder.group({
      userName : new FormControl('', [
        Validators.required
      ]),
      password : new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit () {
    const params = new URLSearchParams();
    params.set('name', this.loginForm.controls.userName.value);
    params.set('password', this.loginForm.controls.password.value);
    // JSON.Stringifyでｏｂｊを文字列化
    // params.set('object', JSON.stringify(this.object));

    // withCredentials: trueは必須これがないとsessionが維持できない
    // angular4は標準レスポンス時にCookieを送り出さないためこの問題が発生する
    this.http.post(APIURL + '/api/login', params, { withCredentials: true })
    .subscribe(
      response => {
        this.responseJson = JSON.stringify(response.json().response);
        if (response.json().code === 23) {
          this.appstate.isLogin = true;
          this.router.navigate(['contents/mypage']);
        }else if (response.json().code === 24) {
          this.appstate.isLogin = false;
          this.router.navigate(['cert/login']);
        }
      },
      error => {
        console.log(error);
      });
  }
}
