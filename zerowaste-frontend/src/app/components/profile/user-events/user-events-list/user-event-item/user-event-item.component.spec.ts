import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEventItemComponent } from './user-event-item.component';

describe('UserEventItemComponent', () => {
  let component: UserEventItemComponent;
  let fixture: ComponentFixture<UserEventItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEventItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
