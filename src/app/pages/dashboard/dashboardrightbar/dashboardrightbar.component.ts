import { Component, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { DashboardOrderNotificationComponent } from 'src/app/components/dashboard-order-notification/dashboard-order-notification.component';

@Component({
  selector: 'app-dashboard-rightbar',
  templateUrl: './dashboardrightbar.component.html',
  styleUrls: ['./dashboardrightbar.component.css'],
})
export class DashboardrightbarComponent {
  constructor(private dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardOrderNotificationComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  @ViewChild('picker') datePicker!: MatDatepicker<Date>;

  openDatePicker(): void {
    this.datePicker.open();
  }
}
