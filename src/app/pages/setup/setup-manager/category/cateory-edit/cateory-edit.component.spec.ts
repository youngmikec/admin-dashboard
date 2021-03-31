import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateoryEditComponent } from './cateory-edit.component';

describe('CateoryEditComponent', () => {
  let component: CateoryEditComponent;
  let fixture: ComponentFixture<CateoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
