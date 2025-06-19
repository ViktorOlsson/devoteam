import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}
  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 500) {
          this.openSnackbar(error, 'Ops, it looks like your request failed with code');
        } else if (error.status >= 500) {
          this.openSnackbar(error, 'The server responded with code');
        }

        return throwError(() => error);
      })
    );
  }

  openSnackbar(error: HttpErrorResponse, message: string) {
    this.snackBar.open(
      `${message}: ${error.status}`,
      'Close',
      {
        duration: 5000,
      }
    );
  }
}
