import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PersonType } from 'src/app/shared/models/person-type';
import { PersonTypeService } from 'src/app/shared/services/person-type.service';

@Component({
  selector: 'app-person-type-list',
  templateUrl: './person-type-list.component.html',
  styleUrls: ['./person-type-list.component.css'],
})
export class PersonTypeListComponent {
  // cached person type list
  personTypes: PersonType[] = [];

  @ViewChild('form')
  form!:NgForm;
  model:PersonType = {} as PersonType;
  
  constructor(private personTypeService: PersonTypeService) { }

  ngOnInit(): void {
    this.model.persons = [];
    this.getPersonTypes();
  }

  getPersonTypes(): void {
    this.personTypeService
      .getPersonTypes()
      .subscribe((personTypesResult) => (this.personTypes = personTypesResult));
  }

  delete(personType: PersonType): void {
    this.personTypeService
      .deletePersonType(personType.personTypeId)
      .subscribe(
        (_) =>
          (this.personTypes = this.personTypes.filter((h) => h !== personType))
      );
  }

  add(): void {

    // we do not want to add anything if the form is invalid
    if (this.form.invalid) { return; }

    this.personTypeService.addPersonType(this.model)
      .subscribe(personType => {
        this.personTypes.push(personType);
        this.form.reset();
      });
  }
}
