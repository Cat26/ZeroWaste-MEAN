import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCalendarComponent } from './user-calendar.component';

describe('UserCalendarComponent', () => {
  let component: UserCalendarComponent;
  let fixture: ComponentFixture<UserCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('getHourAndMinutes function', function () {
  //   it('should modify given date string and return date in format hours:minutes', function() {
  //     let dateString = new Date('December 17, 1995 03:24:00').toDateString();
  //     expect(component.getHourAndMinutes(dateString)).toEqual('3:24');
  //   })
  // });
});
