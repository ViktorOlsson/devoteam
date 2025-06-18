import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteComponent } from './autocomplete.component';
import { mockMovies } from '../../shared/mocks/movies.mock';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when item is clicked in suggestions', () => {
    component.suggestions = [mockMovies[0]];
    fixture.detectChanges();

    spyOn(component.eventEmitMovie, 'emit');

    const listItem = fixture.nativeElement.querySelector('.suggestion-item');
    listItem.click();

    expect(component.eventEmitMovie.emit).toHaveBeenCalledWith(mockMovies[0]);
  });
});
