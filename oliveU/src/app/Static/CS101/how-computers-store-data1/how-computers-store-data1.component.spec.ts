import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowComputersStoreData1Component } from './how-computers-store-data1.component';

describe('HowComputersStoreData1Component', () => {
  let component: HowComputersStoreData1Component;
  let fixture: ComponentFixture<HowComputersStoreData1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowComputersStoreData1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowComputersStoreData1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
