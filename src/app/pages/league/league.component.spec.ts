import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { LeagueComponent } from './league.component';
import { provideRouter } from '@angular/router';

describe('LeagueComponent', () => {
  let component: LeagueComponent;
  let fixture: ComponentFixture<LeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LeagueComponent],
    providers: [provideMockStore(), provideRouter([])]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
