import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-dashboard-main-header',
  templateUrl: './dashboard-main-header.component.html',
  styleUrls: ['./dashboard-main-header.component.css'],
})
export class DashboardMainHeaderComponent {
  username: any;
  constructor(
    private chat: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  @Input() name!: string;
}
