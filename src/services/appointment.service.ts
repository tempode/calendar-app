import { Injectable } from '@angular/core';
import { Appointment } from 'src/models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private storageKey = 'appointments';

/**
   * Returns an array of appointments from local storage if it exists,
   * otherwise it returns an empty array.
   *
   * @return {Appointment[]} An array of appointments.
   */
  getAppointments(): Appointment[] {
    const appointmentsString = localStorage.getItem(this.storageKey);
    return appointmentsString ? JSON.parse(appointmentsString) : [];
  }

    /**
   * Returns the appointment with the given ID, if it exists.
   *
   * @param {any} id - The ID of the appointment to search for.
   * @return {Appointment | undefined} The appointment with the given ID, or undefined if it does not exist.
   */
  getAppointment(id: any): Appointment | undefined {
    const appointments = this.getAppointments();
    return appointments.find(appointment => appointment.id === id);
  }

    /**
   * Adds a new appointment to the list of appointments and saves it to local storage.
   *
   * @param {Appointment} appointment - The appointment to be added.
   * @return {void} This function does not return anything.
   */
  addAppointment(appointment: Appointment): void {
    const appointments = this.getAppointments();

    appointments.push(appointment);
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
  }

    /**
   * Updates an appointment in the appointments list and saves it to local storage.
   *
   * @param {Appointment} appointment - The appointment object to update.
   * @return {void} This function does not return anything.
   */
  updateAppointment(appointment: Appointment): void {
    const appointments = this.getAppointments();
    const index = appointments.findIndex((a: any) => a.id === appointment.id);

    if (index !== -1) {
      appointments[index] = appointment;
      localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    }
  }

    /**
   * Deletes an appointment with the given id.
   *
   * @param {any} id - The id of the appointment to delete.
   * @return {void} This function does not return anything.
   */
  deleteAppointment(id: any): void {
    console.log("Deleting appointment with id:", id);

    const appointments = this.getAppointments();
    const index = appointments.findIndex((a: any) => a.id === id);

    console.log("Index:", index);

    if (index !== -1) {
      appointments.splice(index, 1);
      console.log("Appointments after deletion:", appointments);
      localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    }
  }
}
