import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LogLevel } from '@microsoft/signalr';
import { NgxSpinnerService } from 'ngx-spinner';
import { order } from 'src/app/models/order.model';
import { usermodel } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.css'],
})
export class DashboardOrderComponent {
  dataSource!: any;

  constructor(
    private spinner: NgxSpinnerService,
    private order: OrderService
  ) {}
  RecentOrder!: order[];
  showLoading!: boolean;
  // rows = [
  //   {
  //     orderID: '#45678',
  //     dateCreated: '15/07/2021',
  //     statusOrder: 'Fulfilled',
  //     customer: 'iyiola fisayo',
  //     paymentStatus: 'paid',
  //     amount: 123,
  //   },
  //   {
  //     orderID: '#45678',
  //     dateCreated: '15/07/2021',
  //     statusOrder: 'Fulfilled',
  //     customer: 'iyiola fisayo',
  //     paymentStatus: 'paid',
  //     amount: 123,
  //   },
  //   {
  //     orderID: '#45678',
  //     dateCreated: '15/07/2021',
  //     statusOrder: 'Fulfilled',
  //     customer: 'iyiola fisayo',
  //     paymentStatus: 'paid',
  //     amount: 123,
  //   },
  //   {
  //     orderID: '#45678',
  //     dateCreated: '15/07/2021',
  //     statusOrder: 'Fulfilled',
  //     customer: 'iyiola fisayo',
  //     paymentStatus: 'paid',
  //     amount: 123,
  //   },
  //   {
  //     orderID: '#45678',
  //     dateCreated: '15/07/2021',
  //     statusOrder: 'Fulfilled',
  //     customer: 'iyiola fisayo',
  //     paymentStatus: 'paid',
  //     amount: 123,
  //   },
  //   {
  //     orderID: '#45678',
  //     dateCreated: '15/07/2021',
  //     statusOrder: 'Fulfilled',
  //     customer: 'iyiola fisayo',
  //     paymentStatus: 'paid',
  //     amount: 123,
  //   },
  // ];
  // columns = [
  //   { prop: 'orderID', name: 'ORDER ID', headerClass: 'custom-header1' },
  //   {
  //     prop: 'dateCreated',
  //     name: 'DATE CREATED',
  //     headerClass: 'custom-header1',
  //   },
  //   {
  //     prop: 'statusOrder',
  //     name: 'STATUS ORDER',
  //     headerClass: 'custom-header1',
  //   },
  //   { prop: 'customer', name: 'CUSTOMER', headerClass: 'custom-header1' },
  //   {
  //     prop: 'paymentStatus',
  //     name: 'PAYMENT STATUS',
  //     headerClass: 'custom-header1',
  //   },
  //   { prop: 'amount', name: 'AMOUNT', headerClass: 'custom-header1' },
  // ];
  // filterText: any = '';
  // get filteredRows(): any[] {
  //   return this.rows.filter((row) => {
  //     const rowValues = Object.values(row).join(''); // Convert all row values to a single string
  //     return rowValues.toLowerCase().includes(this.filterText.toLowerCase());
  //   });
  // }
  displayedColumns: string[] = [
    'orderID',
    'dateCreated',
    'customer',
    'statusOrder',
    'amount',
  ];

  statusTexts: any = {
    1: 'Shipping',
    2: 'Delivered',
    3: 'Complaints',
    4: 'Retrieving',
    5: 'Retrieved',
    7: 'Reversed',
    8: 'Completed',
  };
  statusStyles: any = {
    1: {
      bgColor: '#FFC60029',
      textColor: '#FFC600',
      label: 'Shipping',
    },
    2: { bgColor: '#33189D29', textColor: '#33189D', label: 'Delivered' },
    3: { bgColor: '#E1252529', textColor: '#E12525', label: 'Complaints' },
    4: { bgColor: '#E1252529', textColor: '#E12525', label: 'Retrieving' },
    5: { bgColor: '#E1252529', textColor: '#E12525', label: 'Retrieved' },
    7: { bgColor: '#E1252529', textColor: '#E12525', label: 'Reversed' },
    8: { bgColor: '#28C76F29', textColor: '#28C76F', label: 'Completed' },
  };
  ngOnInit(): void {
    this.showLoading = true;
    this.spinner.show();
    this.order.getAllOrders().subscribe(
      (res: any) => {
        this.showLoading = false;
        this.spinner.hide();
        this.RecentOrder = res.data.slice(0, 7);
        this.dataSource = new MatTableDataSource(this.RecentOrder);
      },
      (error) => {}
    );
  }
}
