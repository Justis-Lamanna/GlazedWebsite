import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkmnComponent } from './pkmn.component';

describe('PkmnComponent', () => {
  let component: PkmnComponent;
  let fixture: ComponentFixture<PkmnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkmnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkmnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
