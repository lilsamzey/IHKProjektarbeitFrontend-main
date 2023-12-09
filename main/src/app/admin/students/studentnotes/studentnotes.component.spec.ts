import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentnotesComponent } from './studentnotes.component';

describe('StudentnotesComponent', () => {
  let component: StudentnotesComponent;
  let fixture: ComponentFixture<StudentnotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentnotesComponent]
    });
    fixture = TestBed.createComponent(StudentnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
