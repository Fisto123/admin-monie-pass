import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardComponent } from './dashboard-home/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChatComponent } from './chat-module/chat/chat.component';
import { ChatmessageComponent } from './chat-module/chatmessage/chatmessage.component';
import { DashboardLeftbarComponent } from './dashboard-leftbar/dashboard-leftbar.component';
import { DashboardMainCardComponent } from './dashboard-main-card/dashboard-main-card.component';
import { DashboardMainHeaderComponent } from './dashboard-main-header/dashboard-main-header.component';
import { DashboardrightbarComponent } from './dashboardrightbar/dashboardrightbar.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardOrderNotificationComponent } from 'src/app/components/dashboard-order-notification/dashboard-order-notification.component';
import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
import { ViewUsersDetailComponent } from 'src/app/components/view-users-detail/view-users-detail.component';
import { InvoiceDetailComponent } from 'src/app/components/invoice-detail/invoice-detail.component';
import { FilterInvoiceComponent } from 'src/app/components/filter-invoice/filter-invoice.component';
import { HttpClientModule } from '@angular/common/http';
 
  @NgModule({
    imports: [
      CommonModule,
      DashboardRoutingModule,
      HttpClientModule,
      RouterModule,
      AngularMaterialModule,
      NgxSpinnerModule,
      NgxChartsModule,
      FormsModule,
      ReactiveFormsModule,
      MatIconModule,
      NgxDatatableModule, 
    ],
    declarations: [
      DashboardComponent,
      AnalyticsComponent,
      DashboardOrderNotificationComponent,
      ChatComponent,
      AddUserComponent,
      ChatmessageComponent,
      DashboardLeftbarComponent,
      DashboardMainComponent,
      DashboardMainHeaderComponent,
      DashboardrightbarComponent,
      InvoiceComponent,
      ManageUsersComponent,
      DashboardMainCardComponent,
      OrderComponent,
      OrderDetailsComponent,
      SettingsComponent,
      DashboardOrderComponent,
      ChangePasswordComponent,
      ViewUsersDetailComponent,
      InvoiceDetailComponent,
      FilterInvoiceComponent,
    ],
  })
  export class DashboardModule {}
