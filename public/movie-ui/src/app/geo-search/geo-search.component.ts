import { Component } from '@angular/core';
import { Movie } from '../movies/movies.component';
import { MovieDataService } from '../movie-data.service';

@Component({
  selector: 'app-geo-search',
  templateUrl: './geo-search.component.html',
  styleUrls: ['./geo-search.component.css']
})
export class GeoSearchComponent {
  lng!: number;
  lat!: number;
  movies!:Movie[];
  
  constructor(private _dataService:MovieDataService){}
  geoSearch(){
    this._dataService.getMoviesByLocation(this.lng, this.lat).subscribe(movies=>{
      this.movies = movies;
    });
  }

}
