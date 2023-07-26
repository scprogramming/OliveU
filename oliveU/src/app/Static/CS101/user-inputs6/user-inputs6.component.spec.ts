import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInputs6Component } from './user-inputs6.component';

describe('UserInputs6Component', () => {
  let component: UserInputs6Component;
  let fixture: ComponentFixture<UserInputs6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInputs6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInputs6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
