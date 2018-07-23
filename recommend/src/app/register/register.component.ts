import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared/shared.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { FormControl,FormBuilder,FormGroupDirective,NgForm,Validators ,ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [SharedService]
})
export class RegisterComponent {
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  checkPassword: any;
  resp = '';
  queryParams: any;

  constructor (private http: Http,private builder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private sharedservice: SharedService,
    private appstate: AppState) {
    this.registerForm = this.builder.group({
      Email : new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      userId : new FormControl('', [
        Validators.required
      ]),
      password : new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(8)
      ]),
      confirmPassword : new FormControl('', [
        Validators.required
      ]),
      userName : new FormControl('', [
        Validators.required
      ]),
      sex : new FormControl('男',[]),
      birthday : new FormControl('1990-01-01', []),
      intro : new FormControl('', [])
    }, { validator: this.samePasswords });
  }
  // ,{ validator: this.samePasswords }
  checkPasswordChange () {
    return this.registerForm.get('password').value === this.registerForm.get('confirmPassword').value ? true : false;
  }

  samePasswords (group: FormGroup) {
    return group.get('password').value === group.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  ngOnInit () {
    this._activatedRoute.queryParams.subscribe(
      params => {
        this.queryParams = params;
        this.resp = this.queryParams.status;
      });
  }

  onSubmit () {
    let params = new URLSearchParams();
    params.set('email', this.registerForm.controls.Email.value);
    params.set('uid', this.registerForm.controls.userId.value);
    params.set('password', this.registerForm.controls.password.value);
    params.set('name', this.registerForm.controls.userName.value);
    params.set('birthday', this.registerForm.controls.birthday.value);
    params.set('sex', this.registerForm.controls.sex.value);
    params.set('syoukai', this.registerForm.controls.intro.value);

    this.http.post(APIURL + '/api/register', params, { withCredentials: true })
    .subscribe(
      data => {
        JSON.stringify(data);
        this._router.navigate(['/']);
      },
      error => console.log(error)
    );
  }
}
