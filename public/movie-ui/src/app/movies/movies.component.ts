import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieDataService } from '../movie-data.service';
import { AuthenticationService } from '../authentication.service';


export class Actor {
  #name!: string;
  #age!: number;
  #awards!: number;

  get name() {
    return this.#name;
  }
  get age() {
    return this.#age;
  }
  get awards() {
    return this.#awards;
  }
}

export class Movie {
  #_id!: string;
  #title!: string;
  #genre!: string[];
  #year!: number;
  #duration!: number;
  #location!: string[];
  #actors!: Actor[];

  get _id(): string {
    return this.#_id;
  }
  get title(): string {
    return this.#title;
  }
  set title(title: string) {
    this.#title = title;
  }
  get genre(): string[] {
    return this.#genre;
  }
  get year(): number {
    return this.#year;
  }
  get duration(): number {
    return this.#duration;
  }
  get location(): string[] {
    return this.#location;
  }
  get actors(): Actor[] {
    return this.#actors;
  }

  constructor(title: string, genre: string[], year: number, duration: number) {
    this.#title = title;
    this.#genre = genre;
    this.#year = year;
    this.#duration = duration;
    // this.#location = location;
  }
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})


export class MoviesComponent implements OnInit {
  movies!: Movie[];
  movie!: Movie;
  offset: number = 0;
  count: number = 5;

  constructor(private _movieService: MovieDataService,
     private _route: ActivatedRoute, private _authenticationService:AuthenticationService) {
  }

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies(): void {
    this._movieService.getMovies(this.offset, this.count).subscribe(movies => {
      this.movies = movies;
    });
  }

  deleteOneFromList(id: string): void {
    this._movieService.deleteOneMovieFromList(id).subscribe(movie => {
      this._movieService.getMovies(this.offset, this.count).subscribe(movies => {
        // console.log(movies);
        this.movies = movies;
      });
    })
  }

  next() {
    this.offset += this.count;
    this.getAllMovies();
  }

  previous() {
    if (this.offset >= this.count) {
      this.offset -= this.count;
    }
    this.getAllMovies();
  }
  
  isLoggedIn(){
    return this._authenticationService.isLoggedIn;
  }
}

