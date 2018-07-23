import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppState } from './app.state';
import { ReviewModule } from './review/review.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MypageComponent } from './mypage/mypage.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ErrorComponent } from './shared/error/error.component';
import { EditprofComponent } from './editprof/editprof.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    MypageComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    EditprofComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    ReviewModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [AppState]
})

export class AppModule { }
