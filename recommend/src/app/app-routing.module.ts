import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthguardService, AuthguardService2 } from './shared/authguard/authguard.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MypageComponent } from './mypage/mypage.component';
import { HeaderComponent } from './shared/header/header.component';
import { DetailComponent } from './review/detail/detail.component';
import { PostComponent } from './review/post/post.component';
import { ErrorComponent } from './shared/error/error.component';
import { TopComponent } from './review/top/top.component';
import { EditprofComponent } from './editprof/editprof.component';

const myRoutes = [
  { path: '', component: HomepageComponent },
  { path: 'test', component: TopComponent },
  {
    path: 'contents', children: [
      { path: 'detail', component: DetailComponent },
      { path: 'mypage', component: MypageComponent },
      { path: 'review', component: TopComponent },
      { path: 'post', component: PostComponent },
      { path: 'edit', component: EditprofComponent }
    ]
  },
  {
    path: 'cert', children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '**', component: ErrorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(myRoutes)],
  providers: [AuthguardService, AuthguardService2],
  exports: [RouterModule]
})
export class AppRoutingModule { }
