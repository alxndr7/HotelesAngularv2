import { Routes } from '@angular/router';
import {HotelPersonalComponent} from './hotelPersonal/hotelPersonal.component';

export const AsignacionRoutes: Routes = [
   {
    path: '',
    children: [ {
      path: 'asignacion',
      component: HotelPersonalComponent
    }]
    }
];
