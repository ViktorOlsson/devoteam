import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Movie } from './models/movie.model';
import { firstValueFrom } from 'rxjs';
import { mockMovies } from './shared/mocks/movies.mock';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit suggestions on search input', fakeAsync(() => {
    component.ngOnInit();

    let suggestions: Movie[] | undefined;
    component.suggestions$.subscribe(movies => suggestions = movies);

    component.handleMovieSearch({ searchString: 'Incep', isButtonClicked: false });

    tick(600);

    const req = httpMock.expectOne(`${component['url']}?q=Incep`);
    expect(req.request.method).toBe('GET');

    req.flush([mockMovies[0]]);

    tick();

    expect(suggestions).toEqual([mockMovies[0]]);
  }));

  it('should fetch and emit suggestions when typing query', fakeAsync(() => {
    component.ngOnInit();

    let suggestions: Movie[] | undefined;
    component.suggestions$.subscribe(movies => suggestions = movies);

    component.handleMovieSearch({ searchString: 'In', isButtonClicked: false });

    tick(600);

    const req = httpMock.expectOne(`${component['url']}?q=In`);
    expect(req.request.method).toBe('GET');

    req.flush([mockMovies[0], mockMovies[1]]);

    tick();
    expect(suggestions).toEqual([mockMovies[0], mockMovies[1]]);
  }));

  it('should clear suggestions and set selectedMovies when selecting a movie', fakeAsync(async () => {
    component.ngOnInit();

    component.handleSelectMovie(mockMovies[0]);

    tick();

    expect(component.selectedMovies).toEqual([mockMovies[0]]);

    const suggestions = await firstValueFrom(component.suggestions$);
    expect(suggestions).toEqual([]);
  }));

  it('should not emit suggestions for empty or whitespace queries', fakeAsync(async () => {
    component.ngOnInit();

    component.handleMovieSearch({ searchString: ' ', isButtonClicked: false });

    tick(600);
    httpMock.expectNone(`${component['url']}?q=   `);

    const suggestions = await firstValueFrom(component.suggestions$);
    expect(suggestions).toEqual([]);
  }));

});