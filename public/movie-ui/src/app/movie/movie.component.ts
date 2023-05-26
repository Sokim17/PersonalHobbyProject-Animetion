import { Component, OnInit } from '@angular/core';
import { Movie } from '../movies/movies.component';
import { MovieDataService } from '../movie-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  movie!: Movie;

  constructor(private _movieService: MovieDataService, private _route: ActivatedRoute,
    private routing: Router, private _authenticationService:AuthenticationService) {
    this.movie = new Movie("", [], 0, 0);
  }
  
  movieId = this._route.snapshot.params["movieId"];

  ngOnInit(): void {
    this._movieService.getOneMovie(this.movieId).subscribe(movie => {
      this.movie = movie;
    });
  }

  deleteOne(id: string): void {
    this._movieService.deleteOneMovie(this.movieId).subscribe((movie) => {
      this.routing.navigate(["movies"]);
    });
  }
  isLoggedIn(){
    return this._authenticationService.isLoggedIn;
  }
}
