import { CUSTOM_ELEMENTS_SCHEMA, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component/navbar.component';
import { FooterComponent } from './components/footer/footer.component/footer.component';
import { HomeComponent } from './components/home/home.component/home.component';
import { TourListComponent } from './components/tours/tour-list/tour-list.component/tour-list.component';
import { TourCreateComponent } from './components/tours/tour-create/tour-create.component/tour-create.component';
import { TourEditComponent } from './components/tours/tour-edit/tour-edit.component/tour-edit.component';
import { TourDetailsComponent } from './components/tours/tour-details/tour-details.component/tour-details.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BookingCreateComponent } from './components/bookings/booking-create/booking-create.component/booking-create.component';
import { BookingListComponent } from './components/bookings/booking-list/booking-list.component/booking-list.component';
import { BookingDetailsComponent } from './components/bookings/booking-details/booking-details.component/booking-details.component';
import { BookingUpdateComponent } from './components/bookings/booking-update/booking-update.component/booking-update.component';
import { LoginComponent } from './components/login/login.component';
// import { ProfileComponent } from './components/users/profile/profile.component';
// import { RegisterComponent } from './components/users/register/register.component';

@NgModule({
  declarations: [
    App,
    BookingCreateComponent,
    BookingListComponent,
    BookingDetailsComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    TourListComponent,
    TourCreateComponent,
    TourEditComponent,
    TourDetailsComponent,
    BookingUpdateComponent,
    LoginComponent,
    // RegisterComponent,
    // ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    CurrencyPipe
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
