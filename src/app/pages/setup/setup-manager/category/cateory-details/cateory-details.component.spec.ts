import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateoryDetailsComponent } from './cateory-details.component';

describe('CateoryDetailsComponent', () => {
  let component: CateoryDetailsComponent;
  let fixture: ComponentFixture<CateoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
