import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
