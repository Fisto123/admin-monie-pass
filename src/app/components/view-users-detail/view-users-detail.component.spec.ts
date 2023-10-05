import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsersDetailComponent } from './view-users-detail.component';

describe('ViewUsersDetailComponent', () => {
  let component: ViewUsersDetailComponent;
  let fixture: ComponentFixture<ViewUsersDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUsersDetailComponent]
    });
    fixture = TestBed.createComponent(ViewUsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
