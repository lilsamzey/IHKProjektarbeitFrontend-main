import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAttendanceComponent } from './delete-attendance.component';

describe('DeleteAttendanceComponent', () => {
  let component: DeleteAttendanceComponent;
  let fixture: ComponentFixture<DeleteAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAttendanceComponent]
    });
    fixture = TestBed.createComponent(DeleteAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
