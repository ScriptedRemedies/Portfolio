// src/main.ts

import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication }              from '@angular/platform-browser';
import { BrowserModule }                     from '@angular/platform-browser';
import { BrowserAnimationsModule }           from '@angular/platform-browser/animations';

import { register }      from 'swiper/element/bundle';
import { AppComponent }  from './app/app.component';

register();

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule
    )
  ]
})
  .catch(err => console.error(err));
