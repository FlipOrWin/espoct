import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaEditComponent } from './cita-edit.component';

describe('CitaEditComponent', () => {
  let component: CitaEditComponent;
  let fixture: ComponentFixture<CitaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
