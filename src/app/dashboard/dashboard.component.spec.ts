import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PersonSearchComponent } from '../person-search/person-search.component';
import { PersonService } from '../person.service';
import { PERSONS } from '../mock-persons';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let personService;
  let getPersonsSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    personService = jasmine.createSpyObj('PersonService', ['getPersons']);
    getPersonsSpy = personService.getPersons.and.returnValue(of(PERSONS));
    TestBed
        .configureTestingModule({
          declarations: [DashboardComponent, PersonSearchComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: PersonService, useValue: personService}]
        })
        .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Persons" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Top Persons');
  });

  it('should call personService', waitForAsync(() => {
       expect(getPersonsSpy.calls.any()).toBe(true);
     }));

  it('should display 4 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
     }));
});
