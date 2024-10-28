import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoDetailComponent } from './meteo-detail.component';

describe('MeteoDetailComponent', () => {
  let component: MeteoDetailComponent;
  let fixture: ComponentFixture<MeteoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeteoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
