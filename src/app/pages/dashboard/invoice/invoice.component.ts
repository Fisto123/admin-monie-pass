import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { formatDistanceToNow } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterInvoiceComponent } from 'src/app/components/filter-invoice/filter-invoice.component';
import { InvoiceDetailComponent } from 'src/app/components/invoice-detail/invoice-detail.component';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  invoicecount!: number;
  currentPage: number = 1;
  totalItems!: number;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  statusTexts: any = {
    1: 'Pending',
    2: 'Withdrawn',
    3: 'Processing Payment',
    4: 'Payment Verified',
    5: 'Payment Failed',
  };
  statusStyles: any = {
    1: {
      textColor: '#FFC600',
      label: 'Pending',
    },
    2: { textColor: '#33189D', label: 'Withdrawn' },
    3: {
      textColor: '#cccccc',
      label: 'Processing Payment',
    },
    4: {
      textColor: 'green',
      label: 'Payment Verified',
    },
    5: { textColor: '#E12525', label: 'Payment Failed' },
  };
  constructor(
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private invoice: InvoiceService,
    private cdr: ChangeDetectorRef
  ) {}
  invoices!: Invoice[];
  dataSource: any;
  showLoading!: boolean;

  displayedColumns: string[] = [
    'invoice_id',
    'createdDate',
    'customer',
    'total',
    'status',
  ];
  selection = new SelectionModel<Invoice>(true, []);
  addUsercompoment = InvoiceDetailComponent;
  filterinvoicecompoment = FilterInvoiceComponent;

  width: string = '864px';
  ngOnInit(): void {
    this.showLoading = true;
    this.spinner.show();
    this.getAllInvoices(this.currentPage, 10);
  }
  getAllInvoices(currentPage: number = 1, pageSize: number = 10) {
    this.invoice.getInvoices(this.currentPage, pageSize).subscribe(
      (res: any) => {
        this.showLoading = false;
        this.spinner.hide();
        this.invoices = res.data;  
        this.invoicecount = res.data.length;
        this.totalItems = 50; // Update totalItems
        this.dataSource = new MatTableDataSource(this.invoices);
        this.paginator.pageIndex = currentPage - 1;
        this.paginator.pageSize = pageSize;
      },
      (error) => {}
    );
  }
  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.currentPage = pageIndex + 1;
    this.getAllInvoices(this.currentPage, pageSize);
  }

  ngAfterViewInit() {
    this.totalItems = 50;
    this.cdr.detectChanges(); 
    this.paginator.page.subscribe((event) => {
      const newPage = event.pageIndex + 1;
    });
  }

 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(inputcomponent: any, width: string, invoice: string): void {
    const dialogRef = this.dialog.open(inputcomponent, {
      width,
      data: invoice,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openDialog2(inputcomponent: any, width: string): void {
    const dialogRef = this.dialog.open(inputcomponent, {
      width,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
