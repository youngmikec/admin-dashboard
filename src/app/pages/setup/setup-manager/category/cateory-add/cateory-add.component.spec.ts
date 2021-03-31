import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateoryAddComponent } from './cateory-add.component';

describe('CateoryAddComponent', () => {
  let component: CateoryAddComponent;
  let fixture: ComponentFixture<CateoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateoryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
