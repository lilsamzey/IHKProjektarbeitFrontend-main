import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddialogComponent } from './adddialog.component';

describe('AdddialogComponent', () => {
  let component: AdddialogComponent;
  let fixture: ComponentFixture<AdddialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddialogComponent]
    });
    fixture = TestBed.createComponent(AdddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
