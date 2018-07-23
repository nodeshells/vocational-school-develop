import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { StarRatingModule } from 'angular-star-rating';
import { TagInputModule } from 'ngx-chips';

import { TopComponent } from './top/top.component';
import { DetailComponent,ReportDialog } from './detail/detail.component';
import { PostComponent } from './post/post.component';
import { BrowserModule } from '@angular/platform-browser/src/browser';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    StarRatingModule,
    TagInputModule
  ],
  exports: [
  ],
  declarations: [
    TopComponent,
    DetailComponent,
    ReportDialog,
    PostComponent
  ],
  entryComponents: [
    ReportDialog
  ]
})
export class ReviewModule { }
