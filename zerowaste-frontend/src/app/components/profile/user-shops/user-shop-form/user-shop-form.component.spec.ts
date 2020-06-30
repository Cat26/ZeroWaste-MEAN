import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShopFormComponent } from './user-shop-form.component';

describe('UserShopFormComponent', () => {
  let component: UserShopFormComponent;
  let fixture: ComponentFixture<UserShopFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShopFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
