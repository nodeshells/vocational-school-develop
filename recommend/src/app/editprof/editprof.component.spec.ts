import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofComponent } from './editprof.component';

describe('EditprofComponent', () => {
  let component: EditprofComponent;
  let fixture: ComponentFixture<EditprofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
