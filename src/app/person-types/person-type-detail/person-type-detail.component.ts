import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PersonType } from 'src/app/shared/models/person-type';
import { PersonTypeService } from 'src/app/shared/services/person-type.service';

@Component({
  selector: 'app-person-type-detail',
  templateUrl: './person-type-detail.component.html',
  styleUrls: ['./person-type-detail.component.css']
})
export class PersonTypeDetailComponent implements OnInit {

  @ViewChild('form')
  form!:NgForm;
  model:PersonType = {} as PersonType;

  constructor(private service: PersonTypeService,
    private route: ActivatedRoute,
    private location: Location         
)
{ }


  ngOnInit(): void {
   this.getPersonType();
  }

  getPersonType():void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!,10);
    this.service.getPersonType(id)
        .subscribe(personType => this.model = personType);
  }

  back():void{
    this.location.back();
  }

  // for update
  save():void{
    if(this.model){
      this.model.persons = [];
      this.service.updatePersonType(this.model)
        .subscribe(()=>this.back())
    }
  }



}
