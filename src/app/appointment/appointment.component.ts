import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppointmentService } from 'src/services/appointment.service';
import { DateSelectionService } from 'src/services/date.service';

import { Appointment } from 'src/models/appointment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


interface AppointmentGroup {
    date: string;
    appointments: Appointment[];
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{
    appointmentGroups: AppointmentGroup[] = [];
    filteredAppointmentGroups: AppointmentGroup[] = [];

    constructor(
      private appointmentService: AppointmentService,
      private dateSelectionService: DateSelectionService,
      private router: Router) {}

    ngOnInit(): void {
        this.loadAppointments();
        this.subscribeToDateSelection();
    }

    drop(event: CdkDragDrop<Appointment[]>): void {
        moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
    }

    /**
     * Loads appointments data, groups them by date, and logs the appointments.
     *
     * @return {void} This function does not return anything.
     */
    loadAppointments(): void {
        const appointments = this.appointmentService.getAppointments();
        console.log(appointments);
        this.appointmentGroups = this.groupAppointmentsByDate(appointments);
    }

    /**
     * Groups the given appointments by date and returns an array of AppointmentGroup objects.
     *
     * @param {Appointment[]} appointments - an array of Appointment objects to group
     * @return {AppointmentGroup[]} an array of AppointmentGroup objects, each containing a date and appointments on that date
     */
    groupAppointmentsByDate(appointments: Appointment[]): AppointmentGroup[] {
      const groupedAppointments: AppointmentGroup[] = [];
      const dates: Date[] = [];

      // Extract unique dates from appointments
      appointments.forEach((appointment) => {
        const appointmentDate = new Date(appointment.date);
        if (!dates.find((date) => this.isSameDate(date, appointmentDate))) {
          dates.push(appointmentDate);
        }
      });

      // Group appointments by date
      dates.forEach((date) => {
        const formattedDate = this.formatDate(date);
        const appointmentsOnDate: Appointment[] = appointments.filter((appointment) =>
          this.isSameDate(new Date(appointment.date), date)
        );

        groupedAppointments.push({ date: formattedDate, appointments: appointmentsOnDate });
      });

      return groupedAppointments;
    }


    // Helper method to check if two dates represent the same day
    isSameDate(date1: Date, date2: Date): boolean {
        return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
        );
    }

    // Helper method to format date as "dd MMM, yyyy"
    formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        const year = String(date.getFullYear());

        return `${day} ${month}, ${year}`;
    }

    /**
     * Subscribes to changes in date selection and updates the filtered appointment groups accordingly.
     *
     * @return {void} This function does not return anything.
     */
    subscribeToDateSelection(): void {
      this.dateSelectionService.selectedDate$.subscribe(selectedDate => {
        if (selectedDate) {
          const formattedDate = this.formatDate(selectedDate);
          this.filteredAppointmentGroups = this.appointmentGroups.filter(
            group => group.date === formattedDate
          );
        } else {
          // Show all appointment groups when no date is selected
          this.filteredAppointmentGroups = this.appointmentGroups;
        }
      });
    }

    deleteAppointment(id: any): void {
      this.appointmentService.deleteAppointment(id);
      window.location.reload();
    }

    navigateToCreate(): void {
      this.router.navigate(['/create']);
    }

    navigateToEdit(appointment: Appointment): void {
        this.router.navigate(['/edit', appointment.id]);
    }

}
