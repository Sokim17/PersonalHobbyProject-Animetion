import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Movie } from './movies/movies.component';
import { AuthenticationService } from './authentication.service';



@Injectable({
  providedIn: 'root'
})

export class MovieDataService {

  constructor(private http: HttpClient, private _authentication:AuthenticationService) { }

  baseUrl: string = environment.MOVIE_URL;

  public getMovies(offset: number, count: number): Observable<Movie[]> {
    const url: string = this.baseUrl + "?offset=" + offset + "&count=" + count;
    return this.http.get<Movie[]>(url);
  }

  public getOneMovie(id: string): Observable<Movie> {
    const url: string = this.baseUrl + "/" + id;
    return this.http.get<Movie>(url);
  }

  public deleteOneMovie(id: string): Observable<Movie> {
    const url: string = this.baseUrl + "/" + id;
    const token:string = this._authentication.token;
    console.log("Auth token", this._authentication.token);
    return this.http.delete<Movie>(url, {headers: {authorization: "Bearer ", token}});
  }

  public deleteOneMovieFromList(id: string): Observable<Movie> {
    const url: string = this.baseUrl + "/" + id;
    return this.http.delete<Movie>(url);
  }

  public addOneMovie(movie: Movie): Observable<Movie> {
    const url: string = this.baseUrl;
    return this.http.post<Movie>(url, movie);
  }

  public editOneMovie(id: string, movie: Movie): Observable<Movie> {
    const url: string = this.baseUrl + "/" + id;
    return this.http.patch<Movie>(url, movie);
  }

  public getMoviesByLocation(lng: number, lat: number) {
    const url: string = this.baseUrl + "?lng=" + lng + "&lat=" + lat;
    return this.http.get<Movie[]>(url);
  }

  
}
