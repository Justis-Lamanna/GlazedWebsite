import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkmnfilterComponent } from './pkmnfilter.component';

describe('PkmnfilterComponent', () => {
  let component: PkmnfilterComponent;
  let fixture: ComponentFixture<PkmnfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkmnfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkmnfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
