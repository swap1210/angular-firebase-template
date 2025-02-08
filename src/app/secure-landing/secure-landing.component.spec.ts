import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureLandingComponent } from './secure-landing.component';

describe('SecureLandingComponent', () => {
  let component: SecureLandingComponent;
  let fixture: ComponentFixture<SecureLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecureLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecureLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
