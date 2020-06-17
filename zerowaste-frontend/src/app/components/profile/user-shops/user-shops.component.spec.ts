import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShopsComponent } from './user-shops.component';

describe('UserShopsComponent', () => {
  let component: UserShopsComponent;
  let fixture: ComponentFixture<UserShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
