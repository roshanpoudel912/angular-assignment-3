import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from 'src/app/shared/models/person';
import { PersonType } from 'src/app/shared/models/person-type';
import { MessageService } from 'src/app/shared/services/message.service';
import { PersonTypeService } from 'src/app/shared/services/person-type.service';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  @ViewChild('form')
  form!:NgForm;
  model:Person = {} as Person;
  personTypes: PersonType[] = [];

  constructor(
    private personService: PersonService,
    private messageService: MessageService,
    private personTypeService: PersonTypeService
  ) {}



  ngOnInit(): void {
    this.getPersonTypes();
    this.getPersons();
    
  }

  getPersons(): void {
    this.personService
      .getPersons()
      .subscribe((personResult) => (this.persons = personResult));
  }

  delete(person: Person): void {
    // this.personService
    //   .deletePerson(person.id)
    //   .subscribe(
    //     (_) => (this.persons = this.persons.filter((h) => h !== person))
    //   );
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.personService.addPerson({ name } as Person)
  //     .subscribe(person => {
  //       this.persons.push(person);
  //     });
  // }

  add(): void {

    // we do not want to add anything if the form is invalid
    if (this.form.invalid) { return; }

    this.personService.addPerson(this.model)
      .subscribe(person => {
        this.persons.push(person);
        this.form.reset();
      });

    
  }

  getPersonTypes(): void {
    this.personTypeService
      .getPersonTypes()
      .subscribe((personTypesResult) => (this.personTypes = personTypesResult));
  }
}
