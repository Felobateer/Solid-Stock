import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingHistoryComponent } from './trading-history.component';

describe('TradingHistoryComponent', () => {
  let component: TradingHistoryComponent;
  let fixture: ComponentFixture<TradingHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TradingHistoryComponent]
    });
    fixture = TestBed.createComponent(TradingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
