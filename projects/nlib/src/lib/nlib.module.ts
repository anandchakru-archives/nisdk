import { NgModule } from '@angular/core';
import { NlibComponent } from './nlib.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RDefaultComponent } from './components/r-default/r-default.component';
import { RGuestComponent } from './components/r-guest/r-guest.component';
import { RBgComponent } from './components/r-bg/r-bg.component';
import { RMainComponent } from './components/r-main/r-main.component';
import { RMainTitleComponent } from './components/r-main-title/r-main-title.component';
import { RMainShortMsgComponent } from './components/r-main-short-msg/r-main-short-msg.component';
import { RMainImgComponent } from './components/r-main-img/r-main-img.component';
import { RMainLongMsgComponent } from './components/r-main-long-msg/r-main-long-msg.component';
import { RSliderComponent } from './components/r-slider/r-slider.component';
import { RDetailsComponent } from './components/r-details/r-details.component';
import { RDetailsAddrComponent } from './components/r-details-addr/r-details-addr.component';
import { RDetailsAddrTitleComponent } from './components/r-details-addr-title/r-details-addr-title.component';
import { RDetailsAddrTextComponent } from './components/r-details-addr-text/r-details-addr-text.component';
import { RDetailsTimeFromComponent } from './components/r-details-time-from/r-details-time-from.component';
import { RDetailsTimeFromTitleComponent } from './components/r-details-time-from-title/r-details-time-from-title.component';
import { RDetailsTimeFromTextComponent } from './components/r-details-time-from-text/r-details-time-from-text.component';
import { RDetailsTimeToComponent } from './components/r-details-time-to/r-details-time-to.component';
import { RDetailsTimeToTitleComponent } from './components/r-details-time-to-title/r-details-time-to-title.component';
import { RDetailsTimeToTextComponent } from './components/r-details-time-to-text/r-details-time-to-text.component';
import { RDetailsTimeComponent } from './components/r-details-time/r-details-time.component';

@NgModule({
  declarations: [NlibComponent,
    RDefaultComponent,
    RGuestComponent,
    RBgComponent,
    RMainComponent,
    RMainTitleComponent,
    RMainShortMsgComponent,
    RMainImgComponent,
    RMainLongMsgComponent,
    RSliderComponent,
    RDetailsComponent,
    RDetailsAddrComponent,
    RDetailsAddrTitleComponent,
    RDetailsAddrTextComponent,
    RDetailsTimeFromComponent,
    RDetailsTimeFromTitleComponent,
    RDetailsTimeFromTextComponent,
    RDetailsTimeToComponent,
    RDetailsTimeToTitleComponent,
    RDetailsTimeToTextComponent,
    RDetailsTimeComponent],
  imports: [BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  exports: [NlibComponent,
    RDefaultComponent,
    RGuestComponent,
    RBgComponent,
    RMainComponent,
    RMainTitleComponent,
    RMainShortMsgComponent,
    RMainImgComponent,
    RMainLongMsgComponent,
    RSliderComponent,
    RDetailsComponent,
    RDetailsAddrComponent,
    RDetailsAddrTitleComponent,
    RDetailsAddrTextComponent,
    RDetailsTimeFromComponent,
    RDetailsTimeFromTitleComponent,
    RDetailsTimeFromTextComponent,
    RDetailsTimeToComponent,
    RDetailsTimeToTitleComponent,
    RDetailsTimeToTextComponent,
    RDetailsTimeComponent]
})
export class NlibModule { }
