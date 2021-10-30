import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

let user = localStorage.getItem('user');

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit, AfterContentChecked {

  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    public movieCard: MovieCardComponent
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserMovies();
  }

  ngAfterContentChecked(): void {
    this.filterMovies();
  }

  getUser(): void {
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      this.user.Birthdate = resp.Birthday.slice(0, 10);
      return this.user;
    });
    this.getUserFavorites();
  }

  getUserFavorites(): void {
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      return this.favs;
    });
  }

  openEditProfileDialog(): void {
    this.dialog.open(UserProfileEditComponent, {
      width: '500px'
    })
  }

  deleteProfile(): void {
    let user = localStorage.getItem('user');
    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser(user).subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Your account has been successfully deleted.', 'OK', {
          duration: 3000
        });
      });
    }
  }

  getUserMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  filterMovies(): void {
    this.favorites = this.movies.filter((movie: any) => {
      return this.favs.includes(movie._id);
    });
    return this.favorites;
  }

  removeFromFavs(id: any) {
    this.fetchApiData.removeFavorites(id).subscribe((resp: any) => {
      this.snackBar.open("Removed from favorites.", 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
    });
    return this.getUser();
  }
}
