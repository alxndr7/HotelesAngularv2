import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { RelevoRoutes } from './relevo.routing';

import { SubirExcelComponent } from './subirExcel/subirExcel.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RelevoRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      SubirExcelComponent
  ]
})

export class RelevoModule {}
