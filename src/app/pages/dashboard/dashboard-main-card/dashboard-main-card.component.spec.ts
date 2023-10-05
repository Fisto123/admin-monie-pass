import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainCardComponent } from './dashboard-main-card.component';

describe('DashboardMainCardComponent', () => {
  let component: DashboardMainCardComponent;
  let fixture: ComponentFixture<DashboardMainCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMainCardComponent]
    });
    fixture = TestBed.createComponent(DashboardMainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
