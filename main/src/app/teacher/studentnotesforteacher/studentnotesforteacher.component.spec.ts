import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentnotesforteacherComponent } from './studentnotesforteacher.component';

describe('StudentnotesforteacherComponent', () => {
  let component: StudentnotesforteacherComponent;
  let fixture: ComponentFixture<StudentnotesforteacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentnotesforteacherComponent]
    });
    fixture = TestBed.createComponent(StudentnotesforteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
