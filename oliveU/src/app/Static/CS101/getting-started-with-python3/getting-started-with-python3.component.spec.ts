import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStartedWithPython3Component } from './getting-started-with-python3.component';

describe('GettingStartedWithPython3Component', () => {
  let component: GettingStartedWithPython3Component;
  let fixture: ComponentFixture<GettingStartedWithPython3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GettingStartedWithPython3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GettingStartedWithPython3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
