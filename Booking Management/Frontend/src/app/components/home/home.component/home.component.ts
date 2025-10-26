import { Component, OnInit } from '@angular/core';
import { Tour } from '../../../models/tour.model';
import { TourService } from '../../../services/tour.service';

@Component({
  selector: 'app-home.component',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featured: Tour[] = [];
  loading = false;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.loadFeatured();
  }

  loadFeatured() {
    this.loading = true;
    this.tourService.getAll().subscribe({
      next: tours => {
        // pick first 3 as featured
        this.featured = tours.slice(0, 6);
        this.loading = false;
      },
      error: () => { this.featured = []; this.loading = false; }
    });
  }
}
