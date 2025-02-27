import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTransactionsComponent } from './weekly-transactions.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('WeeklyTransactionsComponent', () => {
  let component: WeeklyTransactionsComponent;
  let fixture: ComponentFixture<WeeklyTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyTransactionsComponent],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
