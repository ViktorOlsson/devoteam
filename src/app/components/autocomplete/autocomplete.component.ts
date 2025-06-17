import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-autocomplete',
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {
   @Input() suggestions: Movie[] = [];
   @Output() eventEmitMovie = new EventEmitter<Movie>();


  onMovieClick(movie: Movie) {
    this.eventEmitMovie.emit(movie);
  }

}
