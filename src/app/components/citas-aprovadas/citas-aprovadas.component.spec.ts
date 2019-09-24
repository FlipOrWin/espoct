import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAprovadasComponent } from './citas-aprovadas.component';

describe('CitasAprovadasComponent', () => {
  let component: CitasAprovadasComponent;
  let fixture: ComponentFixture<CitasAprovadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasAprovadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasAprovadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
