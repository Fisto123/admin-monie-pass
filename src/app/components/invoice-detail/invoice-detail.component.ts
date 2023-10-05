import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent {
  invoice: Invoice = this.data;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Invoice) {}
  ngOnInit(): void {}
}
