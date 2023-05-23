import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from './app.routes';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import {MoviesComponent} from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { GeoSearchComponent } from './geo-search/geo-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigatorComponent,
    FooterComponent,
    HomeComponent,
    ErrorpageComponent,
    MoviesComponent,
    MovieComponent,
    RegisterComponent,
    LoginComponent,
    AddMovieComponent,
    EditMovieComponent,
    GeoSearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Router),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }