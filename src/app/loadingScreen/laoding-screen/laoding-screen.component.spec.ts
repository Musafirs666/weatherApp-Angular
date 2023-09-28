import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaodingScreenComponent } from './laoding-screen.component';

describe('LaodingScreenComponent', () => {
  let component: LaodingScreenComponent;
  let fixture: ComponentFixture<LaodingScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaodingScreenComponent]
    });
    fixture = TestBed.createComponent(LaodingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
