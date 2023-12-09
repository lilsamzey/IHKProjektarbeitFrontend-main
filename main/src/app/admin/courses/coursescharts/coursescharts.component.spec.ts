import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseschartsComponent } from './coursescharts.component';

describe('CourseschartsComponent', () => {
  let component: CourseschartsComponent;
  let fixture: ComponentFixture<CourseschartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseschartsComponent]
    });
    fixture = TestBed.createComponent(CourseschartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
