import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrls: ['./chatmessage.component.css'],
})
export class ChatmessageComponent {
  username: any;
  constructor(
    private chat: ChatService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}
  @Input() message!: string;
  @Input() own!: boolean;
  @Input() name!: string;
  @Input() time!: string;

  join(orderid: string): void {
    this.username = this.auth.decodedUserName();
    this.username, orderid;
  }
}
