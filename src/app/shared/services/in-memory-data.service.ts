import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Person } from '../models/person';
import { PersonType } from '../models/person-type';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const persons = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    const personTypes = [
      { id: 12, name: 'Employee',description:"employee" },
      { id: 13, name: 'Customer',description:"Customer" },
      { id: 14, name: 'Contractor',description:"Contractor" },
      { id: 15, name: 'Vendor' ,description:"Vendor" },
      { id: 16, name: 'Management',description:"Management" },
      { id: 17, name: 'Marketing Leads',description:"Marketing Leads" },
      { id: 18, name: 'Entertainer',description:"Entertainer" },
      { id: 19, name: 'Chefs',description:"Chefs" },
      { id: 20, name: 'Security' ,description:"Security" }
    ];
    return {persons, personTypes};
  }
}
