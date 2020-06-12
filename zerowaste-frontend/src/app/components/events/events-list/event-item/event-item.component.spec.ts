import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlashMessagesModule } from "angular2-flash-messages";

import { EventItemComponent } from './event-item.component';

fdescribe('EventItemComponent', () => {
  let component: EventItemComponent;
  let fixture: ComponentFixture<EventItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventItemComponent ],
      imports: [HttpClientTestingModule, FlashMessagesModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formatDate', function () {
    it('should format given date to full format (example: Monday, May 12, 2020 3:29 PM)',
      function () {
      let date = new Date(2020,5,12,3,24,0);
      expect(component.formatDate(date)).toEqual('Friday, June 12, 2020 3:24 AM');
    })
  })
});
