import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

const routes: Routes = [
  { path: '', component: AppointmentComponent },
  { path: 'create', component: AppointmentFormComponent },
  { path: 'edit/:id', component: AppointmentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
