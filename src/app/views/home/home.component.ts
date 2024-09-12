import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ElementDialogComponent } from '../../shared/element-dialog/element-dialog.component';
import { PeriodicElement } from '../../models/PeriodicElement';
import { PeriodicElementService } from '../../services/periodicElement.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [PeriodicElementService]

})
export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource!: PeriodicElement[];

  constructor(
    public dialog: MatDialog,
    public periodicElementService: PeriodicElementService 
  ){
    this.periodicElementService.getElements().subscribe((data: PeriodicElement[]) => {
      this.dataSource = data;
    })
  }

  openDialog(element: PeriodicElement | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent , {
      width: '250px',
      data: element == null ? {
        position: null,
        name: '',
        weight: null,
        symbol: ''
      } : {
        id: element.id,
        position: element.position,
        name: element.name,
        weight: element.weight,
        symbol: element.symbol
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.periodicElementService.editElement(result)
            .subscribe((data: PeriodicElement) => {
              const index = this.dataSource.findIndex(p => p.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.periodicElementService.createElements(result).subscribe((data: PeriodicElement) => {
            this.dataSource.push(result);
            this.table.renderRows();
          })
          
        }
        
      }     
    });
  }

  editElement(element: PeriodicElement ): void {
     this.openDialog(element)
  }

  deleteElement(position: number): void {
    this.periodicElementService.deleteElement(position)
    .subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== position);
    });
  }


}
