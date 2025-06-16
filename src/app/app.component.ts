import { Component } from '@angular/core';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [SearchInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  url: string = 'https://movies-mock-api-677053851485.europe-north1.run.app/api/movies';

  constructor(private http: HttpClient) {}

  handleMovieSearch(event: any) {
    this.http.get<any>(`${this.url}?q=${event}`).subscribe(data => console.log(data));
  }
}
