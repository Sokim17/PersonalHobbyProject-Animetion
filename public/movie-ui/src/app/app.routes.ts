import { AddMovieComponent } from "./add-movie/add-movie.component";
import { EditMovieComponent } from "./edit-movie/edit-movie.component";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { GeoSearchComponent } from "./geo-search/geo-search.component";
import { HomeComponent } from "./home/home.component";
import { MovieComponent } from "./movie/movie.component";
import { MoviesComponent } from "./movies/movies.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";

export const Router = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "movies",
        component: MoviesComponent
    },
    {
        path: "movies/:movieId",
        component: MovieComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "addmovie",
        component: AddMovieComponent
    },
    {
        path: "editmovie/:movieId",
        component: EditMovieComponent
    },
    {
        path: "search",
        component: GeoSearchComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "**",
        component: ErrorpageComponent
    }
];