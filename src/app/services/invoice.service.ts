import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}
  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>('https://api.moniepass.com/api/v1/Invoice');
  }
  getInvoices(PageNumber: number, PageSize: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(
      `https://api.moniepass.com/api/v1/Invoice?PageNumber=${PageNumber}&PageSize=${PageSize}`
    );
  }
  getAllInvoiceById(invoiceid: string): Observable<Invoice> {
    return this.http.get<Invoice>(
      `https://api.moniepass.com/api/v1/Invoice/invoiceid/${invoiceid}`
    );
  }
}
