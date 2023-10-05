import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterInvoiceComponent } from './filter-invoice.component';

describe('FilterInvoiceComponent', () => {
  let component: FilterInvoiceComponent;
  let fixture: ComponentFixture<FilterInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterInvoiceComponent]
    });
    fixture = TestBed.createComponent(FilterInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
