import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  private apiKey = 'b3344eac27ae2dd9f441551bc490908e'; // Remplacez par votre propre clé API si besoin
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getMeteo(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}&lang=fr`)
      .pipe(
        catchError(error => {
          console.error(`Erreur de requête pour ${city}:`, error);
          return throwError(() => new Error(`Météo introuvable pour ${city}`));
        })
      );
  }
}
