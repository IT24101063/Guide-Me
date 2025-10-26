import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tour } from '../../../../models/tour.model';
import { User } from '../../../../models/user.model';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-booking-create',
  standalone: false,
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css']
})
export class BookingCreateComponent implements OnInit {
  form: FormGroup;
  tours: Tour[] = [];
  users: User[] = [];
  submitting = false;
  message = '';

  constructor(
    fb: FormBuilder,
    private bs: BookingService,
    private router: Router
  ) {
    this.form = fb.group({
      touristId: [null, Validators.required],
      tourId: [null, Validators.required],
      bookingDate: ['', Validators.required],
      guestsCount: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.bs.getTours().subscribe(t => this.tours = t || []);
    this.bs.getUsers().subscribe(u => {
      this.users = (u || []).filter(user => user.role === 'Guide' || user.role === 'GUIDE');
    });

  }


  submit() {
    if (this.form.invalid) {
      this.message = 'Please complete the form.';
      return;
    }
    this.submitting = true;
    const payload = {
      touristId: this.form.value.touristId,
      tourId: this.form.value.tourId,
      bookingDate: this.form.value.bookingDate,
      guestsCount: this.form.value.guestsCount
    };
    this.bs.createBooking(payload).subscribe({
      next: b => {
        this.submitting = false;
        this.router.navigate(['/bookings']);
      },
      error: err => {
        this.message = 'Failed to create booking — check console.';
        console.error(err);
        this.submitting = false;
      }
    });
  }
}
