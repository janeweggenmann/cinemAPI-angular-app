import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileEditComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  editProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((res) => {
      // Logic for successful user registration needs to be implemented here!
      this.dialogRef.close();
      localStorage.setItem('user', res.Username)
      console.log(res);
      this.snackBar.open(this.userData.Username, 'Successfully updated profile!', {
        duration: 3000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 3000
      });
      setTimeout(function () {
        window.location.reload();
      }, 3500);
    })
  }
}