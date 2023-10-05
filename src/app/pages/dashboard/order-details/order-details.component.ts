import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from 'src/app/services/order.service';
import { orderDetails, stage } from 'src/app/models/order.model';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  orderid!: string;
  orderDetails$!: Observable<orderDetails>;
  orderstatus!: string;
  showLoading!: boolean;
  stat!: stage[];
  adminName!: any;

  constructor(
    private order: OrderService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private chat: ChatService,
    private router: Router,
    private auth: AuthService
  ) {}
  approve: boolean = false;
  decline: boolean = false;
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.orderid = params['orderid']));
    this.fetchOrderDetails();
  }
  fetchOrderDetails() {
    this.showLoading = true;
    this.spinner.show();
    this.order.getAllOrdersById(this.orderid).subscribe((res: any) => {
      this.showLoading = false;
      this.spinner.hide();
      this.orderDetails$ = of(res);

      //get orderstatus
      this.orderDetails$.forEach((order) => {
        this.stat = order.stages;
        this.orderstatus = order.stages[order.stages.length - 1].stage;
      });
    });
    //get order stage
  }
  approveComplain() {
    this.approve = !this.approve;
    if (this.decline) {
      this.decline = false;
    }
  }
  finalApprove(orderId: string) {
    const orderinfo = {
      orderId,
      status: 4,
    };
    this.spinner.show();
    this.showLoading = true;
    this.order.updateOrder(orderinfo).subscribe((res: any) => {
      if (res.success === true) {
        this.showLoading = false;
        this.spinner.hide();
        this.toastr.success('Success', 'Transaction approved successful', {
          timeOut: 3000,
        });
        this.fetchOrderDetails();
        this.cancelapproveComplain();
      } else {
        this.toastr.error('Error', 'Transaction approved failed', {
          timeOut: 3000,
        });
      }
    });
  }
  finalDecline(orderId: string) {
    const orderinfo = {
      orderId,
      status: 8,
    };
    this.spinner.show();
    this.showLoading = true;
    this.order.updateOrder(orderinfo).subscribe((res: any) => {
      if (res.success === true) {
        this.toastr.success('Success', 'Transaction declined successful', {
          timeOut: 3000,
        });
        this.showLoading = false;
        this.spinner.hide();
        this.canceldeclineComplain();
        this.fetchOrderDetails();
      } else {
        this.toastr.error('Error', 'Transaction approved failed', {
          timeOut: 3000,
        });
      }
    });
  }

  cancelapproveComplain() {
    this.approve = false;
  }
  declineComplain() {
    this.decline = !this.decline;
    if (this.approve) {
      this.approve = false;
    }
  }
  canceldeclineComplain() {
    this.decline = false;
  }

  create(): void {
    this.adminName = this.auth.decodedUser();
    this.chat.createGroup(this.adminName.username, this.orderid).then(
      () => { 
        this.router.navigate([
          '/dashboard/chat',
          this.orderid,
          this.adminName.username,
        ]);
      },
      (err) => { 
      }
    );
  }
}
