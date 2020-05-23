import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarItemModalComponent } from './calendar-item-modal.component';

describe('CalendarItemModalComponent', () => {
  let component: CalendarItemModalComponent;
  let fixture: ComponentFixture<CalendarItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
