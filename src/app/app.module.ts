import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    HttpClientModule,
    MatInputModule,
    BrowserModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    FormsModule,
    ModalModule.forRoot(),
    NgbModule,
    OrderModule,
    SharedModule
  ],
  providers: [
    CommonModule,
    AppService,
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
