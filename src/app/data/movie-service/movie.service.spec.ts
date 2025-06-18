import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { MovieService } from "./movies.service";
import { TestBed } from "@angular/core/testing";

describe('MovieService', () => {
    let service: MovieService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MovieService],
        });

        service = TestBed.inject(MovieService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should call GET with correct query params', () => {
        service.getMovies('star wars').subscribe();

        const req = httpMock.expectOne(`https://movies-mock-api-677053851485.europe-north1.run.app/api/movies?q=star wars`);
        expect(req.request.method).toBe('GET');
    });

    it('should return empty array on HTTP error', () => {
        service.getMovies('fail').subscribe(movies => {
            expect(movies).toEqual([]);
        });

        const req = httpMock.expectOne(`https://movies-mock-api-677053851485.europe-north1.run.app/api/movies?q=fail`);
        req.flush('Error', { status: 500, statusText: 'Server Error' });
    });
});
