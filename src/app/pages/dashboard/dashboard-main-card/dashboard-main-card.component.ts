import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-main-card',
  templateUrl: './dashboard-main-card.component.html',
  styleUrls: ['./dashboard-main-card.component.css'],
})
export class DashboardMainCardComponent {
  @Input() name!: string;
  @Input() sty!: string;
  @Input() price1!: number;
}
