import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event with "The lord of the rings" and isButtonClicked false when typing in input', () => {
    spyOn(component.eventSearchString, 'emit');

    component.searchString = 'The lord of the rings';
    component.onInputChange();

    expect(component.eventSearchString.emit).toHaveBeenCalledWith({
      searchString: 'The lord of the rings',
      isButtonClicked: false,
    });
  });

  it('should emit event with isButtonClicked true when clicking the button', () => {
    spyOn(component.eventSearchString, 'emit');

    component.searchString = 'Star wars';
    fixture.detectChanges();

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.eventSearchString.emit).toHaveBeenCalledWith({
      searchString: 'Star wars',
      isButtonClicked: true,
    });
  });
});
