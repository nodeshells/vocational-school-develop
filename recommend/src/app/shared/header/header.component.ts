import { Component, ChangeDetectorRef, Inject, Injectable, OnInit } from '@angular/core';
import { SharedModule } from '../shared.module';
import { SharedService } from '../shared.service';
import { Router,NavigationEnd } from '@angular/router';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [SharedService]
})

@Injectable()
export class HeaderComponent {
  constructor (private sharedservice: SharedService,private router: Router, iconRegistry: MatIconRegistry,private appstate: AppState,
    sanitizer: DomSanitizer, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/assets/logo.svg'));
    iconRegistry.addSvgIcon('title', sanitizer.bypassSecurityTrustResourceUrl('/assets/title2.svg'));
  }

  logout () {
    this.sharedservice.logout();
  }

}
