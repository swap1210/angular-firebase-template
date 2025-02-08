import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchUserBottomSheetComponent } from './switch-user-bottom-sheet.component';

describe('SwitchUserBottomSheetComponent', () => {
  let component: SwitchUserBottomSheetComponent;
  let fixture: ComponentFixture<SwitchUserBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchUserBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchUserBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
