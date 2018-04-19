import { Routes } from '@angular/router';
import {ReporteDiarioRelevoComponent} from './reporteDiarioRelevo/reporteDiarioRelevo.component';

export const ReportesRoutes: Routes = [
   {
    path: '',
    children: [ {
      path: 'reporte',
      component: ReporteDiarioRelevoComponent
    }]
    }
];
