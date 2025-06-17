import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

export interface searchStringEvent {
  searchString: string;
  isButtonClicked: boolean;
}

@Component({
  selector: 'app-search-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Output() eventSearchString = new EventEmitter<searchStringEvent>();
  searchString: string = '';

  searchMovie() {
    this.eventSearchString.emit({searchString: this.searchString, isButtonClicked: true});
  }

  onInputChange() {
    this.eventSearchString.emit({searchString: this.searchString, isButtonClicked: false});
  }
}
