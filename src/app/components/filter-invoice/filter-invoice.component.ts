import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-invoice',
  templateUrl: './filter-invoice.component.html',
  styleUrls: ['./filter-invoice.component.css'],
})
export class FilterInvoiceComponent {
  options = [
    'pending',
    'delivered',
    'shipped',
    'complaints',
    'confirmed',
    'payment verified',
  ];

  selectedOptions: string[] = [];

  toggleOption(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(index, 1);
    }
  }

  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }
}
