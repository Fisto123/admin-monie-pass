import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { OrderService } from 'src/app/services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { order } from 'src/app/models/order.model';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  isfilterClicked: boolean = false;
  currentPage: number = 1;
  totalItems!: number;
  showLoading!: boolean;
  orderCount!: number;
  orders!: order[];
  selection = new SelectionModel<order[]>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clickfilter() {
    this.isfilterClicked = !this.isfilterClicked;
  }
  checkboxOptions = [
    { value: 1, label: 'Shipping' },
    { value: 2, label: 'Delivered' },
    { value: 3, label: 'Complaints' },
    { value: 4, label: 'Retrieving' },
    { value: 5, label: 'Retrieved' },
    { value: 7, label: 'Reversed' },
    { value: 8, label: 'Completed' },
  ];

  selectedOption: any | null = null;
  onCheckboxChange(option: { value: number; label: string }) {
    this.filterOrdersByStatus(option.value);
    if (this.selectedOption === option.value) {
      // If the clicked checkbox is the currently selected one, uncheck it
      this.selectedOption = null;
      this.getAllTheOrders();
    } else {
      // Otherwise, set the selected option to the clicked checkbox value
      this.selectedOption = option.value;
    }
  }

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

  constructor(
    private order: OrderService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}
  dataSource: any;

  displayedColumns: string[] = [
    'order_id',
    'created_at',
    'customer',
    'total',
    'status',
  ];
  ngOnInit(): void {
    this.showLoading = true;
    this.spinner.show();
    this.getAllTheOrders(this.currentPage, 10);
  }

  getAllTheOrders(currentPage: number = 1, pageSize: number = 10) {
    this.order.getOrders(this.currentPage, pageSize).subscribe(
      (res: any) => {
        this.showLoading = false;
        this.spinner.hide();
        this.orders = res.data; 
        this.orderCount = res.data.length;
         this.totalItems = 35;  
        this.dataSource = new MatTableDataSource(this.orders);
        this.paginator.pageIndex = currentPage - 1;
        this.paginator.pageSize = pageSize;
      },
      (error) => {
        // (error);
      }
    );
  }
  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.currentPage = pageIndex + 1;
    this.getAllTheOrders(1, pageSize);
  }
  reset() {
    location.reload();
  }

  ngAfterViewInit() {
    this.totalItems = 50; // Update totalItems
    this.cdr.detectChanges(); // Add this line
    this.paginator.page.subscribe((event) => {
      const newPage = event.pageIndex + 1;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filterOrdersByStatus(statusCode: number) {
    // Filter the orders based on the selected status code
    if (statusCode === 9) {
      this.getAllTheOrders();
    }
    const filteredOrders = this.orders.filter(
      (order) => order.status === statusCode
    );
    // Update the data source with the filtered orders
    this.dataSource = new MatTableDataSource(filteredOrders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isfilterClicked = false;
  }
}
