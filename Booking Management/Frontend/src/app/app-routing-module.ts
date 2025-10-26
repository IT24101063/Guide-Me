// import { LoginComponent } from './components/users/login/login.component';
// import { ProfileComponent } from './components/users/profile/profile.component';
// import { RegisterComponent } from './components/users/register/register.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'tours', component: TourListComponent },
//   { path: 'tours/new', component: TourCreateComponent },
//   { path: 'tours/:id/edit', component: TourEditComponent },
//   { path: 'tours/:id', component: TourDetailsComponent },
//   { path: 'bookings', component: BookingListComponent },
//   { path: 'bookings/:id', component: BookingDetailsComponent },
//   { path: 'create', component: BookingCreateComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'profile', component: ProfileComponent },
//   { path: '**', redirectTo: '' }



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingCreateComponent } from './components/bookings/booking-create/booking-create.component/booking-create.component';
import { BookingDetailsComponent } from './components/bookings/booking-details/booking-details.component/booking-details.component';
import { BookingListComponent } from './components/bookings/booking-list/booking-list.component/booking-list.component';
import { TourCreateComponent } from './components/tours/tour-create/tour-create.component/tour-create.component';
import { TourDetailsComponent } from './components/tours/tour-details/tour-details.component/tour-details.component';
import { TourEditComponent } from './components/tours/tour-edit/tour-edit.component/tour-edit.component';
import { TourListComponent } from './components/tours/tour-list/tour-list.component/tour-list.component';
import { HomeComponent } from './components/home/home.component/home.component';
import { BookingUpdateComponent } from './components/bookings/booking-update/booking-update.component/booking-update.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
  // { path: '', redirectTo: 'bookings', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'bookings', component: BookingListComponent },
  { path: 'bookings/new', component: BookingCreateComponent },
  { path: 'bookings/:ref', component: BookingDetailsComponent },
  { path: 'bookings/edit/:ref', component: BookingUpdateComponent },
  { path: 'tours', component: TourListComponent },
  { path: 'tours/new', component: TourCreateComponent },
  { path: 'tours/:id/edit', component: TourEditComponent },
  { path: 'tours/:id', component: TourDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
