import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
import { ViewUsersDetailComponent } from 'src/app/components/view-users-detail/view-users-detail.component';
import { usermodel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent {
  users!: usermodel[];
  dataSource: any;
  showLoading!: boolean;
  userCount!: number;
  currentPage: number = 1;
  totalItems!: number;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private user: UserService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.showLoading = true;
    this.spinner.show();
    this.getAllUsers(this.currentPage, 10);
  }
  getAllUsers(currentPage: number = 1, pageSize: number = 10) {
    this.user.getUsers(this.currentPage, pageSize).subscribe(
      (res: any) => {
        this.showLoading = false;
        this.spinner.hide();
        this.users = res.data;
        this.userCount = res.data.length;
         this.totalItems = 35;  
        this.dataSource = new MatTableDataSource(this.users);
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
    this.getAllUsers(this.currentPage, pageSize);
  }

  ngAfterViewInit() {
    this.totalItems = 50;  
    this.cdr.detectChanges();  
    this.paginator.page.subscribe((event) => {
      const newPage = event.pageIndex + 1;
    });
  }
  displayedColumns: string[] = ['select', 'name', 'email', 'role', 'actions'];
   selection = new SelectionModel<usermodel[]>(true, []);
  addUsercompoment = AddUserComponent;
  width: string = '864px';

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  editElement(element: usermodel) {
    const dialogRef = this.dialog.open(ViewUsersDetailComponent, {
      width: '450px',
      data: element, // Pass the element data to the dialog component
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any result from the dialog if needed
    });
  }

  deleteElement(element: usermodel) {
    // Implement your delete logic here
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(inputcomponent: any, width: string): void {
    const dialogRef = this.dialog.open(inputcomponent, {
      width,
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
