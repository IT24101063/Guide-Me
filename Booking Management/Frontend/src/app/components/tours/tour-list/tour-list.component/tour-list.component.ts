import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tour } from '../../../../models/tour.model';
import { TourService } from '../../../../services/tour.service';

@Component({
  selector: 'app-tour-list.component',
  standalone: false,
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css'
})
export class TourListComponent implements OnInit {
  tours: Tour[] = [];
  loading = false;
  error = '';

  constructor(private tourService: TourService, private router: Router) {}

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours() {
    this.loading = true;
    this.tourService.getAll().subscribe({
      next: data => { this.tours = data; this.loading = false; },
      error: err => { this.error = 'Failed to load tours'; this.loading = false; }
    });
  }

  remove(t: Tour) {
    if (!confirm(`Delete "${t.title}"?`)) return;

    this.tourService.delete(t.id!).subscribe({
      next: () => {
        alert(`"${t.title}" deleted successfully!`);
        this.loadTours();
      },
      error: () => alert('Delete failed')
    });
  }

  edit(t: Tour) {
    this.router.navigate(['/tours', t.id, 'edit']);
  }
}
