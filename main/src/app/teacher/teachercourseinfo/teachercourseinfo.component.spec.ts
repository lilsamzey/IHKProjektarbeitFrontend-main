import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachercourseinfoComponent } from './teachercourseinfo.component';

describe('TeachercourseinfoComponent', () => {
  let component: TeachercourseinfoComponent;
  let fixture: ComponentFixture<TeachercourseinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachercourseinfoComponent]
    });
    fixture = TestBed.createComponent(TeachercourseinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
