import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentinfoforteacherComponent } from './studentinfoforteacher.component';

describe('StudentinfoforteacherComponent', () => {
  let component: StudentinfoforteacherComponent;
  let fixture: ComponentFixture<StudentinfoforteacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentinfoforteacherComponent]
    });
    fixture = TestBed.createComponent(StudentinfoforteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
