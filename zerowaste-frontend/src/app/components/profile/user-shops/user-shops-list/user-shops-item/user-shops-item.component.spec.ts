import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShopsITEMComponent } from './user-shops-item.component';

describe('UserShopsITEMComponent', () => {
  let component: UserShopsITEMComponent;
  let fixture: ComponentFixture<UserShopsITEMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShopsITEMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShopsITEMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
