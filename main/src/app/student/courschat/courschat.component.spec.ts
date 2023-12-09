import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourschatComponent } from './courschat.component';

describe('CourschatComponent', () => {
  let component: CourschatComponent;
  let fixture: ComponentFixture<CourschatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourschatComponent]
    });
    fixture = TestBed.createComponent(CourschatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
