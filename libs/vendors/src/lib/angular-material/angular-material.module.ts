import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule
  ]
})
export class MaterialModule {}
