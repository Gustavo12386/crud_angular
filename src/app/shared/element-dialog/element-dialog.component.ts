import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import { PeriodicElement } from '../../models/PeriodicElement';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-element-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, CommonModule],
  templateUrl: './element-dialog.component.html',
  styleUrl: './element-dialog.component.scss'
})
export class ElementDialogComponent implements OnInit {
  element!: PeriodicElement;
  isChange!: boolean;

  readonly data = inject<PeriodicElement>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ElementDialogComponent>); 
  
  ngOnInit(): void {
    if(this.data.position != null){
      this.isChange = true;
    } else{
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
