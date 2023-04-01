import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTypeListComponent } from './person-type-list.component';

describe('PersonTypeListComponent', () => {
  let component: PersonTypeListComponent;
  let fixture: ComponentFixture<PersonTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
