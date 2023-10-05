import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCommmonComponent } from './shared-commmon.component';

describe('SharedCommmonComponent', () => {
  let component: SharedCommmonComponent;
  let fixture: ComponentFixture<SharedCommmonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedCommmonComponent]
    });
    fixture = TestBed.createComponent(SharedCommmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
