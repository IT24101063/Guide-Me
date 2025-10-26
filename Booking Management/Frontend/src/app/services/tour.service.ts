import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private base = `${environment.apiUrl}/tours`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.base);
  }

  getById(id: number | string): Observable<Tour> {
    return this.http.get<Tour>(`${this.base}/${id}`);
  }

  create(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.base, tour);
  }

  update(id: number | string, tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(`${this.base}/${id}`, tour);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
