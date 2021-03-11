import { Advert } from './advert';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  private advertsUrl = 'api/adverts';

  constructor(private http: HttpClient) { }

  getAdverts(): Observable<Advert[]> {
    return this.http.get<Advert[]>(this.advertsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAdvert(id: number): Observable<Advert> {
    if (id === 0) {
      return of(this.initializeAdvert());
    }
    const url = `${this.advertsUrl}/${id}`;
    return this.http.get<Advert>(url)
      .pipe(
        tap(data => console.log('getAdvert: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createAdvert(product: Advert): Observable<Advert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;
    return this.http.post<Advert>(this.advertsUrl, product, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteAdvert(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.advertsUrl}/${id}`;
    return this.http.delete<Advert>(url, { headers })
      .pipe(
        tap(data => console.log('deleteAdvert: ' + id)),
        catchError(this.handleError)
      );
  }

  updateAdvert(product: Advert): Observable<Advert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.advertsUrl}/${product.id}`;
    return this.http.put<Advert>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateAdvert: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeAdvert(): Advert {
    // Return an initialized object
    return {
      id: 0,
      userId: +localStorage.getItem('id'),
      name: '',
      tags: [''],
      dateAdded: new Date(),
      price: 0,
      description: '',
    };
  }
}
