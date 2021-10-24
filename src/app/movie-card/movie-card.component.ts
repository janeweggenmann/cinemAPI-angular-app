import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

const user = localStorage.getItem('user');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openGenre(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { Name, Description },
      width: '500px'
    });
  }

  openDirector(Name: string, Bio: string, Birth: number): void {
    this.dialog.open(DirectorCardComponent, {
      data: { Name, Bio, Birth },
      width: '500px'
    });
  }

  openSynopsis(Name: string, ImageURL: any, Description: string, Year: number): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { Name, ImageURL, Description, Year },
      width: '500px'
    });
  }

  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.favorites;
    });
  }

  addToFavorites(id: string): void {
    this.fetchApiData.addToFavorites(id).subscribe((res: any) => {
      this.snackbar.open("Added to favorites.", 'OK', {
        duration: 3000,
      });
      return this.getFavorites();
    });
  }

  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavorites(id).subscribe((res: any) => {
      this.snackbar.open("Removed from favorites.", 'OK', {
        duration: 3000,
      });
      window.location.reload();
      return this.getFavorites();
    });
  }

  setFavoriteStatus(id: any): any {
    if (this.favorites.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
