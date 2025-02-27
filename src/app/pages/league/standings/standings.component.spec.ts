import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandingsComponent } from './standings.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('StandingsComponent', () => {
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StandingsComponent],
    providers: [provideMockStore()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
