import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursefileuploadComponent } from './coursefileupload.component';

describe('CoursefileuploadComponent', () => {
  let component: CoursefileuploadComponent;
  let fixture: ComponentFixture<CoursefileuploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursefileuploadComponent]
    });
    fixture = TestBed.createComponent(CoursefileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
