import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement, WithProperties, NgElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { NlibModule } from 'projects/nlib/src/public-api';

declare global {
  interface HTMLElementTagNameMap {
    'nelem-nivite': NgElement & WithProperties<{ /* firewebconfig: string */ }>;
  }
}

@NgModule({
  declarations: [
    AppComponent
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
  }
}
