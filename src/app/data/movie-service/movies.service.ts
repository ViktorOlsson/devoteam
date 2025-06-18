import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url =
    'https://movies-mock-api-677053851485.europe-north1.run.app/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(query: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.url}?q=${query}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('MovieService error:', error);
        return of([]);
      }),
    );
  }
}
