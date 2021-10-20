import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://weggenmann-cinemapi.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occued: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later!'
    );
  }

  /*
  // allow a user to register
  public userRegister(userData: any): Observable<any> {
    return this.http.post(apiUrl + 'register', userData).pipe(
        catchError(this.handleError)
      );
  }

  // allow a user to login
  public userLogin(userData: any): Observable<any> {
    return this.http.post(apiUrl, userData).pipe(
        catchError(this.handleError)
      );
  }

  // gets an array of all movies in the database
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies' + {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // gets a single movie from the database
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/{name}', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // gets a single director from the database
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/{name}', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // gets a single genre from the database
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/{name}', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // gets a single user
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/${username}', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // gets a user's favorite movies
  getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + 'users/${username}/favorites', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // add a movie to user's list of favorites
  addToFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + 'users/${username}/favorites/${movie._id}', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // edit a user's information
  editUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + 'users/${username}', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // delete a user's profile
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/${username}', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // add a movie to user's list of favorites
  removeFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + 'users/${username}/favorites/${movie._id}', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  */

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }
}


