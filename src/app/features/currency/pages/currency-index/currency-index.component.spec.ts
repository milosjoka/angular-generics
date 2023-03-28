import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyIndexComponent } from './currency-index.component';

describe('CurrencyIndexComponent', () => {
  let component: CurrencyIndexComponent;
  let fixture: ComponentFixture<CurrencyIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
