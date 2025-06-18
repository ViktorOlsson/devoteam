import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, filter, switchMap, tap, map } from 'rxjs/operators';

import { SearchInputComponent } from './components/search-input/search-input.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { Movie } from './models/movie.model';
import { searchStringEvent } from './models/search-string-event.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SearchInputComponent,
    AutocompleteComponent,
    MovieCardComponent,
    ToolbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  selectedMovies: Movie[] = [];

  private searchSubject = new BehaviorSubject<searchStringEvent>({
    searchString: '',
    isButtonClicked: false,
  });

  suggestions$!: Observable<Movie[]>;

  private readonly url = 'https://movies-mock-api-677053851485.europe-north1.run.app/api/movies';
  private readonly debounceTimeMs = 600;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.suggestions$ = this.searchSubject.pipe(
      debounceTime(this.debounceTimeMs),
      map(({ searchString, isButtonClicked }) => ({
        trimmedString: searchString.trim(),
        isButtonClicked,
      })),
      switchMap(({ trimmedString, isButtonClicked }) => {
        if (!trimmedString) {
          return of([]);
        }

        return this.http.get<Movie[]>(`${this.url}?q=${trimmedString}`).pipe(
          tap((movies) => {
            if (isButtonClicked && movies.length > 0) {
              this.selectedMovies = [...movies];
            }
          }),
          map((movies) => (isButtonClicked ? [] : movies))
        );
      })
    );
  }

  handleMovieSearch(event: searchStringEvent): void {
    this.searchSubject.next(event);
  }

  handleSelectMovie(movie: Movie): void {
    this.selectedMovies = [movie];

    this.searchSubject.next({
      searchString: '',
      isButtonClicked: false,
    });
  }
}
