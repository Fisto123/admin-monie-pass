import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { order, orderDetails } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  getAllOrders(): Observable<order[]> {
    return this.http.get<order[]>('https://api.moniepass.com/api/v1/Order');
  }
  getOrders(PageNumber: number, PageSize: number): Observable<order[]> {
    return this.http.get<order[]>(
      `https://api.moniepass.com/api/v1/Order?PageNumber=${PageNumber}&PageSize=${PageSize}`
    );
  }
  getAllOrdersById(orderid: string): Observable<orderDetails> {
    return this.http.get<orderDetails>(
      `https://api.moniepass.com/api/v1/Order/orderid/${orderid}`
    );
  }
  updateOrder(orderinfo: any): Observable<orderDetails> {
    return this.http.put<orderDetails>(
      `https://api.moniepass.com/api/v1/Order`,
      { orderId: orderinfo.orderId, status: orderinfo.status }
    );
  }
}
