import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvertsComponent } from './adverts.component';
import { AdvertEditComponent } from './advert-edit.component';
import { AdvertDetailComponent } from './advert-detail.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    AdvertsComponent,
    AdvertEditComponent,
    AdvertDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class AdvertModule { }
