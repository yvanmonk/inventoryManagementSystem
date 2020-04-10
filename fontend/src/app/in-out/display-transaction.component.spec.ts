import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTransactionComponent } from './display-transaction.component';

describe('DisplayTransactionComponent', () => {
  let component: DisplayTransactionComponent;
  let fixture: ComponentFixture<DisplayTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
