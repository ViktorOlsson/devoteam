import { Component } from '@angular/core';
import { SearchInputComponent, searchStringEvent } from './components/search-input/search-input.component';
import { HttpClient } from '@angular/common/http';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { Movie } from './models/movie.model';
import { debounceTime, Subject } from 'rxjs';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SearchInputComponent, AutocompleteComponent, MovieCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  searchString: string = '';
  suggestions: Movie[] = [];
  selectedMovies: Movie[] = [];

  private searchSubject = new Subject<string>();
  private deboucneTime = 600;
  private url: string = 'https://movies-mock-api-677053851485.europe-north1.run.app/api/movies';
  private isButtonTriggeredSearch = false;

  constructor(private http: HttpClient) {
    this.searchSubject
  .pipe(debounceTime(this.deboucneTime))
  .subscribe((query) => {
    if (query) {
      this.searchString = query;
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

  handleMovieSearch(event: searchStringEvent) {
    this.isButtonTriggeredSearch = event.isButtonClicked;
    this.searchSubject.next(event.searchString);
  }

  handleSelectMovie(event: Movie) {
    this.selectedMovies = [event];
    this.suggestions = [];
  }
}
