import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmodeComponent } from './armode.component';

describe('ArmodeComponent', () => {
  let component: ArmodeComponent;
  let fixture: ComponentFixture<ArmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
