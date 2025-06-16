import { Component } from '@angular/core';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { HttpClient } from '@angular/common/http';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { Movie } from './models/movie.model';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [SearchInputComponent, AutocompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  searchString: string = '';
  suggestions: Movie[] = [];
  selectedMovie: Movie | undefined;

  private searchSubject = new Subject<string>();
  private deboucneTime = 600;
  private url: string = 'https://movies-mock-api-677053851485.europe-north1.run.app/api/movies';

  constructor(private http: HttpClient) {
    this.searchSubject
    .pipe(debounceTime(this.deboucneTime))
    .subscribe((query) => {
      if(query) {
        this.searchString = query;
        this.http.get<Movie[]>(`${this.url}?q=${query}`).subscribe(data => {
        this.suggestions = data;
      });
      }
    });
  }

  handleMovieSearch(event: string) {
    this.searchSubject.next(event);
  }

  handleSelectMovie(event: Movie) {
    console.log('NEW', event);
    this.selectedMovie = event;
  }
}
