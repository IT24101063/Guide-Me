import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { Tour } from '../models/tour.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private base = `${environment.apiUrl}/bookings`;
  private tours = `${environment.apiUrl}/tours`;
  private users = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.base);
  }

  getBookingsForUser(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.base}/user/${userId}`);
  }

  getBookingByRef(ref: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.base}/${ref}`);
  }

  createBooking(payload: Partial<Booking>): Observable<Booking> {
    return this.http.post<Booking>(this.base, payload);
  }

  cancelBooking(ref: string): Observable<void> {
    return this.http.post<void>(`${this.base}/cancel/${ref}`, {});
  }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.tours);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.users);
  }

  getBookingById(ref: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.base}/${ref}`);
  }

  updateBooking(ref: string, payload: Partial<Booking>): Observable<Booking> {
    return this.http.put<Booking>(`${this.base}/${ref}`, payload);
  }

  deleteBooking(ref: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${ref}`);
  }
}



