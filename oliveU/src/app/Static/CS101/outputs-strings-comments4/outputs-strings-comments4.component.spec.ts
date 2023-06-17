import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputsStringsComments4Component } from './outputs-strings-comments4.component';

describe('OutputsStringsComments4Component', () => {
  let component: OutputsStringsComments4Component;
  let fixture: ComponentFixture<OutputsStringsComments4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputsStringsComments4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputsStringsComments4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
