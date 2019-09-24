import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaNewComponent } from './wea-new.component';

describe('WeaNewComponent', () => {
  let component: WeaNewComponent;
  let fixture: ComponentFixture<WeaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
