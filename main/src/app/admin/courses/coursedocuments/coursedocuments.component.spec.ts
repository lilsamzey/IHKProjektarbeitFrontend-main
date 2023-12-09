import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursedocumentsComponent } from './coursedocuments.component';

describe('CoursedocumentsComponent', () => {
  let component: CoursedocumentsComponent;
  let fixture: ComponentFixture<CoursedocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursedocumentsComponent]
    });
    fixture = TestBed.createComponent(CoursedocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
