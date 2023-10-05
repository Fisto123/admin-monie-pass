import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrderNotificationComponent } from './dashboard-order-notification.component';

describe('DashboardOrderNotificationComponent', () => {
  let component: DashboardOrderNotificationComponent;
  let fixture: ComponentFixture<DashboardOrderNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardOrderNotificationComponent]
    });
    fixture = TestBed.createComponent(DashboardOrderNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
