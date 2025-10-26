import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../../../models/booking.model';
import { Tour } from '../../../../models/tour.model';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-booking-update.component',
  standalone: false,
  templateUrl: './booking-update.component.html',
  styleUrl: './booking-update.component.css'
})
export class BookingUpdateComponent {
  form!: FormGroup;
  tours: Tour[] = [];
  bookingRef!: string;
  loading = false;
  saving = false;
  guides: any[] = [];

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tourId: ['', Validators.required],
      fullName: ['', Validators.required],
      bookingDate: ['', Validators.required],
      guestsCount: [1, [Validators.required, Validators.min(1)]],
    });

    this.bookingRef = this.route.snapshot.paramMap.get('ref')!;
    this.loadTours();
    this.loadGuides();
    this.loadBookingDetails();
  }

  loadGuides(): void {
    this.bookingService.getUsers().subscribe({
      next: (data) => {
        // Filter only guides if needed
        this.guides = data.filter(u => u.role === 'GUIDE' || u.role === 'Guide');
      },
      error: (err) => console.error('Failed to load guides', err)
    });
  }

  loadTours(): void {
    this.bookingService.getTours().subscribe({
      next: (data) => (this.tours = data),
      error: (err) => console.error('Failed to load tours', err),
    });
  }

  loadBookingDetails(): void {
    this.loading = true;
    this.bookingService.getBookingByRef(this.bookingRef).subscribe({
      next: (booking) => {
        this.form.patchValue({
          tourId: booking.tourId,
          fullName: booking.fullName,
          bookingDate: booking.bookingDate,
          guestsCount: booking.guestsCount,
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load booking', err);
        this.loading = false;
        alert('Failed to load booking details.');
        this.router.navigate(['/bookings']);
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload: Partial<Booking> = this.form.value;

    this.bookingService.updateBooking(this.bookingRef, payload).subscribe({
      next: () => {
        this.saving = false;
        alert('Booking updated successfully!');
        this.router.navigate(['/bookings']);
      },
      error: (err) => {
        console.error(err);
        this.saving = false;
        alert('Failed to update booking.');
      },
    });
  }
}
