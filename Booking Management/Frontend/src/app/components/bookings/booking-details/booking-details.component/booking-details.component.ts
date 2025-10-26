import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../../../models/booking.model';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-booking-detail',
  standalone: false,
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  booking?: Booking;
  bookings: Booking[] = [];
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    const ref = this.route.snapshot.paramMap.get('ref')!;
    this.bookingService.getBookingByRef(ref).subscribe({
      next: b => { this.booking = b; this.loading = false; },
      error: e => { this.error = 'Failed to load booking'; this.loading = false; console.error(e) }
    });
    this.loadBookings();
  }

  loadBookings() {
    this.loading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (res: Booking[]) => { this.bookings = res; this.loading = false; },
      error: () => { alert('Failed to load bookings'); this.loading = false; }
    });
  }

  deleteBooking(ref: string) {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    this.bookingService.deleteBooking(ref).subscribe({
      next: () => {
        alert('Booking deleted successfully');
        this.router.navigate(['/bookings']);
        this.loadBookings(); 
      },
      error: () => alert('Failed to delete booking')
    });
  }

  cancel() {
    if (!this.booking) return;
    if (!confirm('Cancel this booking?')) return;
    this.bookingService.cancelBooking(this.booking.bookingRef).subscribe({
      next: () => { alert('Cancelled'); this.router.navigate(['/bookings']); },
      error: e => { alert('Failed to cancel'); console.error(e); }
    });
  }

}
