import { Component, ChangeDetectorRef } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MediaMatcher]
})
export class AppComponent {
  constructor (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('/assets/logo.svg'));
    iconRegistry.addSvgIcon('title', sanitizer.bypassSecurityTrustResourceUrl('/assets/title2.svg'));
  }
}
