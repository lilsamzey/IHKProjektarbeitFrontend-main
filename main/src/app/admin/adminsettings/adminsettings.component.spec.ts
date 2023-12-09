import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsettingsComponent } from './adminsettings.component';

describe('AdminsettingsComponent', () => {
  let component: AdminsettingsComponent;
  let fixture: ComponentFixture<AdminsettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminsettingsComponent]
    });
    fixture = TestBed.createComponent(AdminsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
