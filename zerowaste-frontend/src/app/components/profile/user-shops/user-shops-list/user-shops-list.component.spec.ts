import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShopsListComponent } from './user-shops-list.component';

describe('UserShopsListComponent', () => {
  let component: UserShopsListComponent;
  let fixture: ComponentFixture<UserShopsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShopsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShopsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
