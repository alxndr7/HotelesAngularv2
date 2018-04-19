import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import {LiberarHabitacionRoutes} from './liberarHabitacion.routing';
import {DesocuparHabitacionComponent} from './desocuparHabitacion/desocuparHabitacion.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LiberarHabitacionRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      DesocuparHabitacionComponent
  ]
})

export class LiberarHabitacionModule {}
