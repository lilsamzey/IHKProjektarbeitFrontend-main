import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CousestatisticsComponent } from './cousestatistics.component';

describe('CousestatisticsComponent', () => {
  let component: CousestatisticsComponent;
  let fixture: ComponentFixture<CousestatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CousestatisticsComponent]
    });
    fixture = TestBed.createComponent(CousestatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
