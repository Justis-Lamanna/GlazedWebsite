import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkmnprofileComponent } from './pkmnprofile.component';

describe('PkmnprofileComponent', () => {
  let component: PkmnprofileComponent;
  let fixture: ComponentFixture<PkmnprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkmnprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkmnprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
