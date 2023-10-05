import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard-home/dashboard.component';
import { authGuard } from 'src/app/guard/auth.guard';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SettingsComponent } from './settings/settings.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { superAuthGuard } from 'src/app/guard/superauth.guard';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ChatComponent } from './chat-module/chat/chat.component';
import { NotfoundComponent } from '../notfound/notfound.component';

const routes: Routes = [
  { path: 'notfound', component: NotfoundComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardMainComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'order/:orderid', component: OrderDetailsComponent },
      { path: 'settings', component: SettingsComponent },
      {
        path: 'users',
        component: ManageUsersComponent,
        canActivate: [superAuthGuard],
      },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'chat/:orderid/:username', component: ChatComponent },
      { path: 'chat', component: ChatComponent },
      { path: '**', component: NotfoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
