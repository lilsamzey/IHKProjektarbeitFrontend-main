import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseannouncementComponent } from './courseannouncement.component';

describe('CourseannouncementComponent', () => {
  let component: CourseannouncementComponent;
  let fixture: ComponentFixture<CourseannouncementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseannouncementComponent]
    });
    fixture = TestBed.createComponent(CourseannouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
