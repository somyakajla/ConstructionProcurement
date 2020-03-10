import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTimelineComponent } from './progress-timeline.component';

describe('ProgressTimelineComponent', () => {
  let component: ProgressTimelineComponent;
  let fixture: ComponentFixture<ProgressTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
