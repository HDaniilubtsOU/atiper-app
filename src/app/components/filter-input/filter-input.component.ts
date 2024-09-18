import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './filter-input.component.html',
  styleUrl: './filter-input.component.css'
})
export class FilterInputComponent {

  @Output() filterChanged = new EventEmitter<string>();

  // Subject for debouncing and filtering
  private filterSubject: Subject<string> = new Subject<string>();

  constructor() {
    // Subscribing to changes from debounce for 2 seconds
    this.filterSubject
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((filterValue) => {
        this.filterChanged.emit(filterValue.trim().toLowerCase());
      });
  }

  onInputChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);  // Sending the value to Subject
  }

}
