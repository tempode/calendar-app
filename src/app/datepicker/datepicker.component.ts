import { Component } from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';

import { DateSelectionService } from 'src/services/date.service';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent {
    selected: Date = new Date();

    constructor(private dateSelectionService: DateSelectionService) {}

    /**
    * Sets the selected date using the dateSelectionService.
    *
    * @param date - the date to be set
    * @return This function does not return anything
    */
    onDateSelected(date: Date): void {
      this.dateSelectionService.setSelectedDate(date);
    }
}
