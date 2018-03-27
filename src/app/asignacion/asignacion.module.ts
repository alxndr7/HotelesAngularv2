import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import {AsignacionRoutes} from './asignacion.routing';
import {HotelPersonalComponent} from './hotelPersonal/hotelPersonal.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AsignacionRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      HotelPersonalComponent
  ]
})

export class AsignacionModule {}
