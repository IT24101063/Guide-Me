import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../../../../models/booking.model';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-booking-list',
  standalone: false,
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  filtered: Booking[] = [];
  q = '';
  statusFilter = 'ALL';

  constructor(private bs: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.bs.getAllBookings().subscribe(list => {
      // normalize date strings
      this.bookings = (list || []).map(b => ({ ...b, bookingDate: b.bookingDate, createdAt: b.createdAt }));
      this.applyFilters();
    });
  }

  applyFilters() {
    const q = this.q.trim().toLowerCase();
    this.filtered = this.bookings.filter(b => {
      if (this.statusFilter !== 'ALL' && b.status !== this.statusFilter) return false;
      if (!q) return true;
      return (
        (b.bookingRef || '').toLowerCase().includes(q) ||
        (b.tourTitle || '').toLowerCase().includes(q) ||
        (b.qrCodeData || '').toLowerCase().includes(q)
      );
    });
  }

  goCreate() {
    this.router.navigate(['/bookings/new']);
  }

  view(b: Booking) {
    this.router.navigate(['/bookings', b.bookingRef]);
  }

  getStatusClass(s?: string) {
    switch ((s || '').toUpperCase()) {
      case 'CONFIRMED': return 'badge-confirmed';
      case 'CANCELLED': return 'badge-cancelled';
      case 'PENDING': return 'badge-pending';
      default: return 'badge-default';
    }
  }
}
