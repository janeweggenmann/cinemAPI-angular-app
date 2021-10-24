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

  /** Allow user to register
   * @method POST
   * @param userData  
   * @returns status success/error message
  */
  public userRegister(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userData, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  /** Allow user to login
    * @method POST
    * @param userData  
    * @returns status success/error message
   */
  public userLogin(userData: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userData).pipe(
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

  /** Get all movies from database
     * @method GET
     * @param endpoint to get all movies: "/movies" 
     * @returns an array of movies
    */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Get a single movie from database
     * @method GET
     * @param endpoint to get all movies: "/movies/:movieId" 
     * @param - director name is required 
     * @returns a single movie
    */
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Get a single director from database
    * @method GET
    * @param endpoint to get director by name: "/directors/:Name" 
    * @param - director name is required 
    * @returns a single director
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'directors/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Get a single genre from database
    * @method GET
    * @param endpoint to get genre by name: "/genres/:Name" 
    * @param - genre name is required 
    * @returns a single genre
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'genres/Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Get a single user from database
     * @method GET
     * @param endpoint to get genre by name: "/users/:Username" 
     * @param - username is required 
     * @returns a single user
    */
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /** Allow a user to edit their information
    * @method PUT
    * @param endpoint to get genre by name: "/users/:Username" 
    * @param userData is required (username, password, email, birthday)
    * @returns a success/error message
   */
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put<any>(apiUrl + `users/${username}`, userData,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  /** Allow a user to delete their account
    * @method DELETE
    * @param endpoint to get genre by name: "/users/:Username"
    * @param username is required  
    * @returns a success/error message
   */
  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<any>(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Get a user's list of favorite movies
    * @method GET
    * @param endpoint to get genre by name: "/users/:Username"
    * @param username is required 
    * @returns an array of favorite movies
   */
  getFavorites(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Add a movie to a user's list of favorites
    * @method POST
    * @param endpoint to get genre by name: "/users/:Username/favorites/:id"
    * @param username is required 
    * @param id is required
    * @returns a success/error message
   */
  addToFavorites(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post<any>(apiUrl + 'users/' + username + '/favorites/' + id, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /** Delete a movie from a user's list of favorites
    * @method DELETE
    * @param endpoint to get genre by name: "/users/:Username/favorites/:id"
    * @param username is required 
    * @param id is required
    * @returns a success/error message
   */
  removeFavorites(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete<any>(apiUrl + `users/${username}/favorites/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }
}


