import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorModeBtnComponent } from './color-mode-btn.component';

describe('ColorModeBtnComponent', () => {
  let component: ColorModeBtnComponent;
  let fixture: ComponentFixture<ColorModeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorModeBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorModeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
