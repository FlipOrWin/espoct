import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasTotalesComponent } from './citas-totales.component';

describe('CitasTotalesComponent', () => {
  let component: CitasTotalesComponent;
  let fixture: ComponentFixture<CitasTotalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasTotalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
