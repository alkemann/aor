import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnLogComponent } from './turn-log.component';

describe('TurnLogComponent', () => {
  let component: TurnLogComponent;
  let fixture: ComponentFixture<TurnLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
