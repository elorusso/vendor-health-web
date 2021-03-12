import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusCheckAPI } from 'src/classes/dalc/StatusCheckAPI';
import { StatusTracker } from 'src/classes/business-layer/StatusTracker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusCheckAPI,
    StatusTracker
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
