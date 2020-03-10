import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDetailsComponent } from './progress-details.component';

describe('ProgressDetailsComponent', () => {
  let component: ProgressDetailsComponent;
  let fixture: ComponentFixture<ProgressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
