import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePasswordFormComponent } from './cliente-password-form.component';

describe('ClientePasswordFormComponent', () => {
  let component: ClientePasswordFormComponent;
  let fixture: ComponentFixture<ClientePasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientePasswordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
