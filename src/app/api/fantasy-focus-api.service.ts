import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://sleeperfantasyfocus-be.onrender.com/api';
// const apiUrl = 'https://fantasy-dashboard.thundercloud.dev';

@Injectable({
  providedIn: 'root'
})
export class FantasyFocusApiService {
  readonly http = inject(HttpClient);

  #handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  #extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  fantasyFocusGet(sport: String, ids: string[]): Observable<any> {
    return this.http.post(`${apiUrl}/${sport}`, {players: ids})
      .pipe(
        map(this.#extractResponseData),
        catchError(this.#handleError)
      )
  }
}
