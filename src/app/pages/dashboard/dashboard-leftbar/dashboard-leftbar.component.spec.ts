import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLeftbarComponent } from './dashboard-leftbar.component';

describe('DashboardLeftbarComponent', () => {
  let component: DashboardLeftbarComponent;
  let fixture: ComponentFixture<DashboardLeftbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLeftbarComponent]
    });
    fixture = TestBed.createComponent(DashboardLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
