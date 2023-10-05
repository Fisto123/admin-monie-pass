import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardrightbarComponent } from './dashboardrightbar.component';

describe('DashboardrightbarComponent', () => {
  let component: DashboardrightbarComponent;
  let fixture: ComponentFixture<DashboardrightbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardrightbarComponent]
    });
    fixture = TestBed.createComponent(DashboardrightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
