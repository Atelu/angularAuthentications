import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFailedComponent } from './button-failed.component';

describe('ButtonFailedComponent', () => {
  let component: ButtonFailedComponent;
  let fixture: ComponentFixture<ButtonFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
