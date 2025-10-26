import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../../../services/tour.service';

@Component({
  selector: 'app-tour-edit.component',
  standalone: false,
  templateUrl: './tour-edit.component.html',
  styleUrl: './tour-edit.component.css'
})
export class TourEditComponent implements OnInit {
  form: FormGroup;
  id!: number;
  loading = false;
  saving = false;

  constructor(
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private tourService: TourService,
  private router: Router
) {
  this.form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    location: ['', [Validators.required]],
    price: [null, [Validators.required, Validators.min(1)]],
    durationDays: [null, [Validators.required, Validators.min(1)]],
    startDate: ['', [Validators.required]]
  });
}


  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load() {
    this.loading = true;
    this.tourService.getById(this.id).subscribe({
      next: t => {
        this.form.patchValue(t);
        this.loading = false;
      },
      error: () => { this.loading = false; alert('Load failed'); this.router.navigate(['/tours']); }
    });
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.tourService.update(this.id, this.form.value).subscribe({
      next: () => { this.saving = false; this.router.navigate(['/tours']); },
      error: () => { this.saving = false; alert('Save failed'); }
    });
  }
}
