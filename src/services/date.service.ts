import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateSelectionService {
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);
  selectedDate$ = this.selectedDateSubject.asObservable();

    /**
   * Sets the selected date.
   *
   * @param {Date} date - The date to be set as selected.
   * @return {void} This function does not return anything.
   */
  setSelectedDate(date: Date): void {
    this.selectedDateSubject.next(date);
  }
}
