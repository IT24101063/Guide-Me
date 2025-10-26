import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from '../../../../models/tour.model';
import { TourService } from '../../../../services/tour.service';

@Component({
  selector: 'app-tour-details.component',
  standalone: false,
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.css'
})
export class TourDetailsComponent implements OnInit {
  tour?: Tour;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.router.navigate(['/tours']); return; }
    this.loading = true;
    this.tourService.getById(id).subscribe({
      next: t => { this.tour = t; this.loading = false; },
      error: () => { this.loading = false; alert('Failed to load'); this.router.navigate(['/tours']); }
    });
  }
}
