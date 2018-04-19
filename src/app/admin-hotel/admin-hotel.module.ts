import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import {PrincipalHotelComponent} from './principal/principal-hotel.component';
import {AdminHotelRoutes} from './admin-hotel.routing';
import {FilterPipe} from './utils/FilterPipe';
import {RegistroComponent} from './registro/registro.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminHotelRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      FilterPipe,
      RegistroComponent,
      PrincipalHotelComponent
  ]
})

export class AdminHotelModule {}
