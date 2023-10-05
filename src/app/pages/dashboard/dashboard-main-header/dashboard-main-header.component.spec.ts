import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainHeaderComponent } from './dashboard-main-header.component';

describe('DashboardMainHeaderComponent', () => {
  let component: DashboardMainHeaderComponent;
  let fixture: ComponentFixture<DashboardMainHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMainHeaderComponent]
    });
    fixture = TestBed.createComponent(DashboardMainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
