import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TourService } from '../../../../services/tour.service';

@Component({
  selector: 'app-tour-create.component',
  standalone: false,
  templateUrl: './tour-create.component.html',
  styleUrl: './tour-create.component.css'
})
export class TourCreateComponent {
  form: FormGroup;
  saving = false;
  error = '';

  constructor(private fb: FormBuilder, private tourService: TourService, private router: Router) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      location: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      durationDays: [1, [Validators.min(1)]],
      startDate: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.tourService.create(this.form.value).subscribe({
      next: () => { this.saving = false; this.router.navigate(['/tours']); },
      error: () => { this.error = 'Create failed'; this.saving = false; }
    });
  }
}
