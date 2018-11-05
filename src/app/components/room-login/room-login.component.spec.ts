import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomLoginComponent } from './room-login.component';

describe('RoomLoginComponent', () => {
  let component: RoomLoginComponent;
  let fixture: ComponentFixture<RoomLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
