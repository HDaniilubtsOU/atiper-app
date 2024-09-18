import { Component, OnInit  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { TableService, PeriodicElement } from '../../services/table.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { EditDialogComponent} from '../edit-dialog/edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoadingService } from '../../services/loading.service';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SpinnerComponent,
    EditDialogComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FilterInputComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource = new MatTableDataSource<PeriodicElement>([]); // Initialize with an empty array

  placeholderData: PeriodicElement[] = [
    { position: 0, name: 'Loading...', weight: 0, symbol: '...' }, // Placeholder
    { position: 0, name: 'Loading...', weight: 0, symbol: '...' },
    { position: 0, name: 'Loading...', weight: 0, symbol: '...' },
    { position: 0, name: 'Loading...', weight: 0, symbol: '...' },
    { position: 0, name: 'Loading...', weight: 0, symbol: '...' },
    { position: 0, name: 'Loading...', weight: 0, symbol: '...' },
    { position: 0, name: 'Loading...', weight: 0, symbol: '...' },
    { position: 0, name: 'Loading...', weight: 0, symbol: '...' },
    { position: 0, name: 'Loading...', weight: 0, symbol: '...' },
    { position: 0, name: 'Loading...', weight: 0, symbol: '...' },
  ];

  loading$: Observable<boolean>;

  constructor(
    private tableService: TableService,
    private dialog: MatDialog,
    public loadingService: LoadingService
  ) {

    this.loading$ = this.loadingService.loading$; // Download status
    
  } 

  ngOnInit() {
    // Initially, we show a table with a placeholder text
    this.dataSource.data = this.placeholderData;

    // Starting the data download process
    this.loadData();
  }

  loadData() {
    // Turn on the spinner
    this.loadingService.showLoading();

    // Downloading data from the service
    this.tableService.fetchData().subscribe((data) => {
      // After downloading the data, update the table
      this.dataSource.data = data;

      // Turning off the spinner
      this.loadingService.hideLoading();
    });
  }

  editElement(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: { ...element }  // Passing a copy of the element to the dialog
    });

    dialogRef.afterClosed().subscribe((result: PeriodicElement | undefined) => {
      if (result) {
        // Find the index of the element in the array
        const index = this.dataSource.data.findIndex(el => el.position === element.position);
        if (index !== -1) {
          // Updating an element in the data array
          this.dataSource.data[index] = { ...element, ...result };
          this.dataSource = new MatTableDataSource(this.dataSource.data); // Updating DataSource
        }
      }
    });
  }

  // Application of filtration
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

