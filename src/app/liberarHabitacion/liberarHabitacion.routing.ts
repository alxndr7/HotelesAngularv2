import { Routes } from '@angular/router';
import {DesocuparHabitacionComponent} from './desocuparHabitacion/desocuparHabitacion.component';


export const LiberarHabitacionRoutes: Routes = [
   {
    path: '',
    children: [ {
      path: 'liberarHabitacion',
      component: DesocuparHabitacionComponent
    }]
    }
];
