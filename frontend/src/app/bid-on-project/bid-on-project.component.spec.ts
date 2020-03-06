import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidOnProjectComponent } from './bid-on-project.component';

describe('BidOnProjectComponent', () => {
  let component: BidOnProjectComponent;
  let fixture: ComponentFixture<BidOnProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidOnProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidOnProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
