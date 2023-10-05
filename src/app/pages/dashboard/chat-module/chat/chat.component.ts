import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageDto, MessageDto2 } from 'src/app/models/message-dto';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  @ViewChild('chatWindow', { static: false }) chatWindow!: ElementRef;

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];
  onlineuser!: string;
  numOfInvites: number = 0;
  username: string = '';
  showLoading!: boolean;
  sendMsgForm!: FormGroup;
  isFlagSet: boolean = true;
  name: any;
  chatMessage!: string;
  msgInboxArray2!: any[];
  id!: string | null;
  showBar: boolean = false;
  isorderId: any;
  messageSubscription: any;

  constructor(
    private fb: FormBuilder,
    private chat: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private renderer: Renderer2
  ) {
    this.messageSubscription = this.chat
      .retrieveMappedObject()
      .subscribe((receivedObj: MessageDto) => {
        this.addToInbox(receivedObj);
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from incoming messages when the component is destroyed
    this.messageSubscription.unsubscribe();
  }

  toogleBar() {
    this.showBar = !this.showBar;
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.username = obj.username;
    newObj.message = obj.message;
    newObj.orderid = obj.orderid;
    this.msgInboxArray.push(newObj);
    this.scrollToBottom();
    this.updateChatWindowHeight();
  }
  ngOnInit(): void {
    this.reactiveForm();
    this.isorderId = this.route.snapshot.params['orderid'];
    this.msgDto.orderid = this.route.snapshot.params['orderid'];
    this.msgDto.username =
      this.route.snapshot.params['username'] || this.auth.decodedUserName();
    this.onlineuser = this.msgDto.username;
    this.getChats(); // Get chats should be called here
    this.getGroups();
    this.startListening();
    this.scrollToBottom();
  }

  reactiveForm() {
    this.sendMsgForm = this.fb.group({
      message: ['', [Validators.required]],
    });
  }
  onsendMessage(value: any) {
    this.msgDto.orderid = this.route.snapshot.params['orderid'];
    this.msgDto.username = this.route.snapshot.params['username'];
    this.msgDto.message = value.message;
    if (this.msgDto) {
      if (
        this.msgDto.username.length == 0 ||
        this.msgDto.orderid == null ||
        this.msgDto.message == null
      ) {
        window.alert('all fields are required.');
        return;
      } else {
        let chatdetails = {
          username: this.msgDto.username,
          groupId: this.msgDto.orderid,
          message: this.msgDto.message,
        };

        this.chat.sendMessageToGroup(chatdetails).subscribe((res) => {
          this.scrollToBottom();
          this.updateChatWindowHeight();
        });
        this.sendMsgForm.reset();
      }
    }
  }

  private getChats = () => {
    this.showLoading = true;
    this.spinner.show();
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('orderid')!;
      this.chat.getChats(this.id).subscribe({
        next: (chats) => {
          this.showLoading = false;
          this.spinner.hide();
          this.msgInboxArray = chats;
        },
        error: (error) => {},
      });
    });
  };
  private getGroups = () => {
    this.chat
      .getGroups(this.onlineuser || this.auth.decodedUserName())
      .subscribe({
        next: (response) => {
          this.msgInboxArray2 = response.chatGroups;
          this.numOfInvites = response.invitesCount;
        },
        error: (error) => {},
      });
  };
  view(id: string): void {
    this.chat.joinGroup(id, this.username).then(
      () => {
        this.router.navigate(['/dashboard/chat', id, this.onlineuser]);
      },
      (err) => {}
    );
    this.scrollToBottom();
  }
  startListening() {
    this.chat.listenToGroupFeed();
    this.scrollToBottom();
  }
  scrollToBottom() {
    try {
      this.chatWindow.nativeElement.scrollTop =
        this.chatWindow.nativeElement.scrollHeight;
    } catch (err) {}
  }

  updateChatWindowHeight() {
    // Declare the desiredHeight variable
    let desiredHeight = 0;

    // Calculate the desired height based on the number of messages
    let messages = this.msgInboxArray.length;
    if (messages > 0) {
      const messageHeight = 80;
      desiredHeight = messages * messageHeight;
    }

    // Set the height of the chatWindow div
    this.renderer.setStyle(
      this.chatWindow.nativeElement,
      'height',
      `${desiredHeight}px`
    );
  }
}
