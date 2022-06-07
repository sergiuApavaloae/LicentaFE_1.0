import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinTableComponent } from './pin-table.component';

describe('PinTableComponent', () => {
  let component: PinTableComponent;
  let fixture: ComponentFixture<PinTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
