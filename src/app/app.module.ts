import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentComponent } from './appointment/appointment.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateSelectionService } from 'src/services/date.service';

import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [
        AppComponent,
        AppointmentFormComponent,
        AppointmentComponent
    ],
    providers: [DateSelectionService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DatepickerComponent,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatIconModule
      ]
})
export class AppModule { }
