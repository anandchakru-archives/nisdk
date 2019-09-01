import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement, WithProperties, NgElement } from '@angular/elements';

import { AppComponent } from './app.component';
import {
  NlibModule, RDefaultComponent,
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
  RDetailsTimeComponent
} from 'projects/nlib/src/public-api';

declare global {
  interface HTMLElementTagNameMap {
    'nelem-nivite': NgElement & WithProperties<{ /* firewebconfig: string */ }>;
  }
}

@NgModule({
  declarations: [
    AppComponent, RDefaultComponent,
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
    RDetailsTimeComponent
  ],
  imports: [
    BrowserModule,
    NlibModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) { }
  ngDoBootstrap() {
    if (!customElements.get('nelem-nivite')) {
      customElements.define('nelem-nivite', createCustomElement(AppComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-default')) {
      customElements.define('nelem-r-default', createCustomElement(RDefaultComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-bg')) {
      customElements.define('nelem-r-bg', createCustomElement(RBgComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details')) {
      customElements.define('nelem-r-details', createCustomElement(RDetailsComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details-addr')) {
      customElements.define('nelem-r-details-addr', createCustomElement(RDetailsAddrComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details-addr-text')) {
      customElements.define('nelem-r-details-addr-text', createCustomElement(RDetailsAddrTextComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details-addr-title')) {
      customElements.define('nelem-r-details-addr-title', createCustomElement(RDetailsAddrTitleComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details-time')) {
      customElements.define('nelem-r-details-time', createCustomElement(RDetailsTimeComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details-time-from')) {
      customElements.define('nelem-r-details-time-from', createCustomElement(RDetailsTimeFromComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details-time-from-text')) {
      customElements.define('nelem-r-details-time-from-text', createCustomElement(RDetailsTimeFromTextComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details-time-from-title')) {
      customElements.define('nelem-r-details-time-from-title', createCustomElement(RDetailsTimeFromTitleComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details-time-to')) {
      customElements.define('nelem-r-details-time-to', createCustomElement(RDetailsTimeToComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details-time-to-text')) {
      customElements.define('nelem-r-details-time-to-text', createCustomElement(RDetailsTimeToTextComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-details-time-to-title')) {
      customElements.define('nelem-r-details-time-to-title', createCustomElement(RDetailsTimeToTitleComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-guest')) {
      customElements.define('nelem-r-guest', createCustomElement(RGuestComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-main')) {
      customElements.define('nelem-r-main', createCustomElement(RMainComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-main-img')) {
      customElements.define('nelem-r-main-img', createCustomElement(RMainImgComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-main-long-msg')) {
      customElements.define('nelem-r-main-long-msg', createCustomElement(RMainLongMsgComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-main-short-msg')) {
      customElements.define('nelem-r-main-short-msg', createCustomElement(RMainShortMsgComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-main-title')) {
      customElements.define('nelem-r-main-title', createCustomElement(RMainTitleComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-slider')) {
      customElements.define('nelem-r-slider', createCustomElement(RSliderComponent, { injector: this.injector }));
    }
    if (!customElements.get('nelem-r-default')) {
      customElements.define('nelem-r-default', createCustomElement(RDefaultComponent, { injector: this.injector }));
    }
  }
}
