import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseattendanceComponent } from './courseattendance.component';

describe('CourseattendanceComponent', () => {
  let component: CourseattendanceComponent;
  let fixture: ComponentFixture<CourseattendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseattendanceComponent]
    });
    fixture = TestBed.createComponent(CourseattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
