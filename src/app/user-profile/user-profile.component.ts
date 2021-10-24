import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  user: any = {};
  movies: any[] = [];
  favorites: any[] = [];
  favs: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    public movieCard: MovieCardComponent
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
    this.getFavorites();
  }

  getUser(): void {
    let user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      this.user.Birthday = res.Birthday.slice(0, 10);
    });
  }

  openEditProfileDialog(): void {
    this.dialog.open(UserProfileEditComponent, {
      width: '500px'
    })
  }

  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Your account has been successfully deleted.', 'OK', {
          duration: 3000
        });
      });
    }
  }

  getFavorites(): void {
    let user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      this.favorites = res.FavoriteMovies;
      return this.favorites;
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.filterMovies();
    });
  }

  filterMovies(): void {
    this.movies.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favs.push(movie);
      }
    });
    return this.favs;
  }

  removeFromFavs(id: any): void {
    this.fetchApiData.removeFavorites(id).subscribe((resp: any) => {
      this.snackBar.open("Removed from favorites.", 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 3000);
    });
    return this.getFavorites();
  }

}
