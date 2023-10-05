import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { MessageDto, MessageDto2 } from '../models/message-dto';
import { Observable, Subject } from 'rxjs';
import { GroupDto } from '../models/group-dto';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // private connection: any = new signalR.HubConnectionBuilder()
  //   .withUrl('http://134.209.238.95:8082/chatsocket') // mapping to the chathub as in startup.cs
  //   .configureLogging(signalR.LogLevel.Information)
  //   .build();

  readonly API_URL = 'https://api.moniepass.com/api/v1/Chat';

  private receivedMessageObject: MessageDto = new MessageDto();
  private sharedObj = new Subject<MessageDto>();
  connection: signalR.HubConnection;

  constructor(private http: HttpClient) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://134.209.238.95:8082/chatsocket')
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.startConnection();
  }

  private startConnection = () => {
    this.connection
      .start()
      .then(() => 'Connection started')
      .catch((err: any) => {});
  };

  // Call the hub methods below to do the following
  public createGroup(username: string, orderid: string) {
    return new Promise((resolve, reject) => {
      this.connection.invoke('CreateGroup', username, orderid).then(
        () => {
          return resolve(true);
        },
        (err: any) => {
          return reject(err);
        }
      );
    });
  }

  public joinGroup(orderid: string, username: string) {
    // accept invite - join group
    return new Promise((resolve, reject) => {
      this.connection.invoke('JoinGroup', orderid, username).then(
        () => {
          return resolve(true);
        },
        (err: any) => {
          return reject(err);
        }
      );
    });
  }

  public listenToGroupFeed = () => {
    // listen to group chats
    this.connection.on('Send', (username: string, message: string) => {
      this.receivedMessageObject.username = username;
      this.receivedMessageObject.message = message;
      this.sharedObj.next(this.receivedMessageObject);
    });
  };

  public mapReceivedMessage(
    orderid: string,
    username: string,
    message: string
  ): void {
    this.receivedMessageObject.orderid = orderid;
    this.receivedMessageObject.username = username;
    this.receivedMessageObject.message = message;
    this.sharedObj.next(this.receivedMessageObject);
  }

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }

  // Call the controller methods below to do the following
  public getInvites(username: string) {
    // gets groups that user has been invited
    return this.http.get<string[]>(
      `${this.API_URL}/invites?username=${username}`
    );
  }

  public getGroups(username: string) {
    // gets groups that user has joined
    return this.http.get<GroupDto>(
      `${this.API_URL}/groups?username=${username}`
    );
  }

  public getChats(orderid: string) {
    // gets chats in a group
    return this.http.get<MessageDto[]>(
      `https://api.moniepass.com/api/v1/Chat/messages?groupid=${orderid}`
    );
  }

  public sendMessageToGroup(msgDto: MessageDto2) {
    return this.http.post(`${this.API_URL}/send`, msgDto);
  }
}
