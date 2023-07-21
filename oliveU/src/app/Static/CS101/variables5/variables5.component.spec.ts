import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Variables5Component } from './variables5.component';

describe('Variables5Component', () => {
  let component: Variables5Component;
  let fixture: ComponentFixture<Variables5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Variables5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Variables5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
