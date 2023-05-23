import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from './movies/movies.component';

@Injectable({
  providedIn: 'root'
})

export class MovieDataService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:3000/api";

  public getMovies(offset: number, count: number): Observable<Movie[]> {
    const url: string = this.baseUrl + "/movies" + "?offset=" + offset + "&count=" + count;
    return this.http.get<Movie[]>(url);
  }

  public getOneMovie(id: string): Observable<Movie> {
    const url: string = this.baseUrl + "/movies" + "/" + id;
    return this.http.get<Movie>(url);
  }

  public deleteOneMovie(id: string): Observable<Movie> {
    const url: string = this.baseUrl + "/movies" + "/" + id;
    return this.http.delete<Movie>(url);
  }

  public deleteOneMovieFromList(id: string): Observable<Movie> {
    const url: string = this.baseUrl + "/movies" + "/" + id;
    return this.http.delete<Movie>(url);
  }

  public addOneMovie(movie: Movie): Observable<Movie> {
    const url: string = this.baseUrl + "/movies";
    return this.http.post<Movie>(url, movie);
  }

  public editOneMovie(id: string, movie: Movie): Observable<Movie> {
    const url: string = this.baseUrl + "/movies" + "/" + id;
    return this.http.patch<Movie>(url, movie);
  }

  public getMoviesByLocation(lng: number, lat: number) {
    const url: string = this.baseUrl + "/movies" + "?lng=" + lng + "&lat=" + lat;
    return this.http.get<Movie[]>(url);
  }

  // public registerUser(user: any):Observable<Register>{
  //   const url:string = this.baseUrl + "/user";
  //   return this.http.post<User>(url);
  // }
}
