import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError, Subject, forkJoin, from } from 'rxjs';
import { catchError, tap, map, concatMap, mergeMap, first, take, concatAll, mergeAll, toArray, switchMap } from 'rxjs/operators';

import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users';
  users: User[];
  checkUser: User[];

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User>{
    if (id === 0){
      return of (this.initializeUser());
    }
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(data => {
        console.log('All: ' + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  createUser(storeUser: User): Observable<User>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<User>(this.usersUrl, storeUser, {headers})
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never>{
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
      return throwError(errorMessage);
    }else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      console.error(errorMessage);
      return throwError(errorMessage);
    }
  }

  private initializeUser(): User {
    // Return an initialized object
    return {
      id: 0,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      phoneNumber: null
    };
  }
}
