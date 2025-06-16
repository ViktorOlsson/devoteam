import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Output() eventSearchString = new EventEmitter<string>();
  searchString: string = '';

  searchMovie() {
    this.eventSearchString.emit(this.searchString);
  }
}
