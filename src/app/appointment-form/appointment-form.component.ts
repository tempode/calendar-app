import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { AppointmentService } from 'src/services/appointment.service';
import { Appointment } from 'src/models/appointment';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
    appointmentForm: FormGroup;
    isEditMode: boolean = false;
    appointment: Appointment | undefined;

    constructor(
      private formBuilder: FormBuilder,
      private appointmentService: AppointmentService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      this.appointmentForm = this.formBuilder.group({
        title: ['', Validators.required],
        date: ['', Validators.required],
        description: ''
      });
    }

    ngOnInit(): void {
      const appointmentId = this.route.snapshot.paramMap.get('id');
      if (appointmentId) {
        this.isEditMode = true;
        this.appointment = this.appointmentService.getAppointment(appointmentId);
        if (this.appointment) {
          this.populateFormWithAppointment(this.appointment);
        } else {
          // Handle appointment not found
          console.log("Appointment not found");
        }
      }
    }

    populateFormWithAppointment(appointment: Appointment): void {
      this.appointmentForm.patchValue({
        title: appointment.title,
        date: appointment.date,
        description: appointment.description
      });
    }

    /**
     * Executes when the submit button is clicked on the appointment form.
     * If the form is invalid, the function returns.
     * If the form is valid, the function either updates an existing appointment or creates a new appointment.
     * After the appointment is updated or created, the form is reset and the user is navigated to the home page.
     *
     * @return {void} This function does not return anything.
     */
    onSubmit(): void {
      if (this.appointmentForm.invalid) {
        return;
      }

      if (this.isEditMode && this.appointment) {
        // Update existing appointment
        this.appointment.title = this.appointmentForm.value.title;
        this.appointment.date = this.appointmentForm.value.date;
        this.appointment.description = this.appointmentForm.value.description;
        this.appointmentService.updateAppointment(this.appointment);
      } else {
        // Create new appointment
        const newAppointment: Appointment = {
          id: uuidv4(),
          title: this.appointmentForm.value.title,
          date: this.appointmentForm.value.date,
          description: this.appointmentForm.value.description
        };
        this.appointmentService.addAppointment(newAppointment);
      }

      this.appointmentForm.reset();
      this.router.navigate(['/']);
    }

    closeForm(): void {
      this.router.navigate(['/']);
    }
}
