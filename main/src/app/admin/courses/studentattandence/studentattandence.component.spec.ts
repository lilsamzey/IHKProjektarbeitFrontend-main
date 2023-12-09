import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentattandenceComponent } from './studentattandence.component';

describe('StudentattandenceComponent', () => {
  let component: StudentattandenceComponent;
  let fixture: ComponentFixture<StudentattandenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentattandenceComponent]
    });
    fixture = TestBed.createComponent(StudentattandenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
