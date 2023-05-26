import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Movie } from '../movies/movies.component';
import { MovieDataService } from '../movie-data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})

export class AddMovieComponent {

  addMovieForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _movieService: MovieDataService) { }

  ngOnInit() {
    this.addMovieForm = this._formBuilder.group({
      title: "",
      genre: "",
      year: 0,
      duration: 0
    });
  }

  message: string = "";

  addMovie() {
    const _movie: any = {
      title: this.addMovieForm.value.title,
      genre: this.addMovieForm.value.genre.split(','),
      year: this.addMovieForm.value.year,
      duration: this.addMovieForm.value.duration
    };

    this._movieService.addOneMovie(_movie).subscribe({
      next: (movie) => {
        console.log("Movie Created", movie);
        this.message = "Movie Created";
        console.log(this.message);
        this.addMovieForm = this._formBuilder.group({
          title: "",
          genre: "",
          year: 0,
          duration: 0
        });
      }
    });

  }



}
