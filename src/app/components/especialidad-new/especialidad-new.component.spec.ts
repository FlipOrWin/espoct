import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadNewComponent } from './especialidad-new.component';

describe('EspecialidadNewComponent', () => {
  let component: EspecialidadNewComponent;
  let fixture: ComponentFixture<EspecialidadNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
