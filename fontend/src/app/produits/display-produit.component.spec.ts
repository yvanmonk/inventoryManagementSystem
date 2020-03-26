import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProduitComponent } from './display-produit.component';

describe('DisplayProduitComponent', () => {
  let component: DisplayProduitComponent;
  let fixture: ComponentFixture<DisplayProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
