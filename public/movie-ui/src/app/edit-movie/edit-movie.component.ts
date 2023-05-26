import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { MovieDataService } from '../movie-data.service';
import { Movie } from '../movies/movies.component';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  editMovieForm!: FormGroup;
  id!: string;
  movie!: Movie;

  constructor(private _formBuilder: FormBuilder, private _movieService: MovieDataService, private _route: ActivatedRoute,
    private router: Router) {
    this.movie = new Movie("", [], 0, 0);
    this.editMovieForm = this._formBuilder.group({
      title: "",
      genre: "",
      year: 0,
      duration: 0
    });
  }

  ngOnInit() {
    this.id = this._route.snapshot.params["movieId"];

    this._movieService.getOneMovie(this.id).subscribe(movie => {
      this.movie = movie;
      this.editMovieForm.setValue({
        title: this.movie.title,
        genre: this.movie.genre.toString(),
        year: this.movie.year,
        duration: this.movie.duration
      });
      console.log(movie);

    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("The Changes called");

    this.editMovieForm.setValue({
      title: this.movie.title,
      genre: this.movie.genre.toString(),
      year: this.movie.year,
      duration: this.movie.duration
    });
  }

  message: string = "";

  editMovie() {
    const _movie: any = {
      title: this.editMovieForm.value.title,
      genre: this.editMovieForm.value.genre.split(','),
      year: this.editMovieForm.value.year,
      duration: this.editMovieForm.value.duration
    };

    this._movieService.editOneMovie(this.id, _movie).subscribe({
      next: (movie) => {
        this.message = "Movie Updated";
        console.log(this.message);
        // this.router.navigate(["movies"]);
      }
    });
  }
}
