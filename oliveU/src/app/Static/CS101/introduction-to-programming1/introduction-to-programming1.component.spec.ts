import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionToProgramming1Component } from './introduction-to-programming1.component';

describe('IntroductionToProgramming1Component', () => {
  let component: IntroductionToProgramming1Component;
  let fixture: ComponentFixture<IntroductionToProgramming1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionToProgramming1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductionToProgramming1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
