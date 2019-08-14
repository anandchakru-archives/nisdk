import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NlibModule } from 'projects/nlib/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NlibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
