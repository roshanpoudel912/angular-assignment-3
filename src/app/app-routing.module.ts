import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonTypeDetailComponent } from './person-types/person-type-detail/person-type-detail.component';
import { PersonTypeListComponent } from './person-types/person-type-list/person-type-list.component';
import { PersonListComponent } from './persons/person-list/person-list.component';

const routes: Routes = [
  {
    path: 'persons',
    component: PersonListComponent, 
  },
  {
    path: 'persontypes',
    component: PersonTypeListComponent,   
  },
  {
    path: 'persontypes/detail/:id',
    component: PersonTypeDetailComponent,   
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
