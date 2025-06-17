import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { HttpClient } from '@angular/common/http';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { Movie } from './models/movie.model';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { searchStringEvent } from './models/search-string-event.model';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SearchInputComponent, AutocompleteComponent, MovieCardComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  searchString$: Observable<string> | undefined;
  suggestions: Movie[] = [];
  selectedMovies: Movie[] = [];

  private searchSubject = new BehaviorSubject<string>('');
  private deboucneTime = 600;
  private url: string = 'https://movies-mock-api-677053851485.europe-north1.run.app/api/movies';
  private isButtonTriggeredSearch = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchSubject
  .pipe(debounceTime(this.deboucneTime))
  .subscribe((query) => {
    console.log('[DEBUG] Search fired with query:', query);
    if (query) {
      this.searchString$ = this.searchSubject.asObservable();
      console.log('[DEBUG] Request URL:', `${this.url}?q=${query}`);
      this.http.get<Movie[]>(`${this.url}?q=${query}`).subscribe(data => {
        this.suggestions = data;
        
        if (this.isButtonTriggeredSearch && data.length > 0) {
          this.selectedMovies = [...data];
          this.suggestions = [];
        }
        this.isButtonTriggeredSearch = false;
      });
    }
  });
  }

  handleMovieSearch(event: searchStringEvent): void {
    this.isButtonTriggeredSearch = event.isButtonClicked;
    this.searchSubject.next(event.searchString);
  }

  handleSelectMovie(event: Movie): void {
    this.selectedMovies = [event];
    this.suggestions = [];
  }
}
