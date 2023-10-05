import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { usermodel } from 'src/app/models/user.model';

@Component({
  selector: 'app-view-users-detail',
  templateUrl: './view-users-detail.component.html',
  styleUrls: ['./view-users-detail.component.css'],
})
export class ViewUsersDetailComponent {
  user: usermodel = this.data;
  constructor(@Inject(MAT_DIALOG_DATA) public data: usermodel) {}
  ngOnInit(): void {}
}
