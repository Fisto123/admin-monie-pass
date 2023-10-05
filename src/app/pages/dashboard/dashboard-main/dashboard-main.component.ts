import { Component, HostListener } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dashboard-main-order',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
})
export class DashboardMainComponent {
  viewWidth = 300;
  viewHeight = 300;
  ordercount!: number;
  invoicecount!: number;
  constructor(private order: OrderService, private invoice: InvoiceService) {}
  // Define breakpoints for small, medium, and large screens
  extrasmallScreenBreakpoint = 500;
  smallScreenBreakpoint = 500;
  mediumScreenBreakpoint = 600;
  largeScreenBreakpoint = 1240;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Get the current window width
    const windowWidth = event.target.innerWidth;

    // Determine the appropriate view size based on screen width
    if (windowWidth < this.extrasmallScreenBreakpoint) {
      this.viewWidth = 360;
      this.viewHeight = 300;
    }
    if (windowWidth < this.smallScreenBreakpoint) {
      this.viewWidth = 260;
      this.viewHeight = 300;
    } else if (windowWidth < this.mediumScreenBreakpoint) {
      this.viewWidth = 300;
      this.viewHeight = 300;
    } else {
      this.viewWidth = 800;
      this.viewHeight = 300;
    }
  }
  ngOnInit() {
    // Initialize your chart and other settings here
    this.order.getAllOrders().subscribe(
      (res: any) => {
        this.ordercount = res.data.length;
      },
      (error) => {}
    );
    this.invoice.getAllInvoices().subscribe(
      (res: any) => {
        this.invoicecount = res.data.length;
      },
      (error) => {}
    );
  }
  showXAxis = true;
  showYAxis = true;
  gradient = false; // or true
  title = 'funds';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  chartData = [
    {
      name: 'Funds in',
      series: [
        { name: 'Jan', value: 50 },
        { name: 'Feb', value: 80 },
        { name: 'Mar', value: 20 },
        { name: 'Apr', value: 10 },
        { name: 'May', value: 1000 },
        { name: 'Jun', value: 400 },
        { name: 'Jul', value: 400 },
        { name: 'Aug', value: 400 },
        { name: 'Sept', value: 400 },
        { name: 'Oct', value: 400 },

        // Add more data points here
      ],
    },
    // Add more series here if needed
  ];
}
