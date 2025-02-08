import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceUserComponent } from './service-user.component';

describe('ServiceUserComponent', () => {
  let component: ServiceUserComponent;
  let fixture: ComponentFixture<ServiceUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
