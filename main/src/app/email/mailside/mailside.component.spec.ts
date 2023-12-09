import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailsideComponent } from './mailside.component';

describe('MailsideComponent', () => {
  let component: MailsideComponent;
  let fixture: ComponentFixture<MailsideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailsideComponent]
    });
    fixture = TestBed.createComponent(MailsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
