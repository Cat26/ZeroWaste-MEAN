import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsItemComponent } from './shops-item.component';

describe('ShopsItemComponent', () => {
  let component: ShopsItemComponent;
  let fixture: ComponentFixture<ShopsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
