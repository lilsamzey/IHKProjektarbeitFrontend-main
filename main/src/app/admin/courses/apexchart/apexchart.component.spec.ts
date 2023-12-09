import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartComponent } from './apexchart.component';

describe('ApexchartComponent', () => {
  let component: ApexchartComponent;
  let fixture: ComponentFixture<ApexchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApexchartComponent]
    });
    fixture = TestBed.createComponent(ApexchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
