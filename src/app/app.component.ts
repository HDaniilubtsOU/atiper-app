import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FilterInputComponent } from './components/filter-input/filter-input.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TableComponent,
    SpinnerComponent,
    FilterInputComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'Hello world';
  title = 'atiper-app';
}
