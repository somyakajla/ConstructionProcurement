import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptWinningBidComponent } from './accept-winning-bid.component';

describe('AcceptWinningBidComponent', () => {
  let component: AcceptWinningBidComponent;
  let fixture: ComponentFixture<AcceptWinningBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptWinningBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptWinningBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
