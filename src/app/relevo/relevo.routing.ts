import { Routes } from '@angular/router';

import { SubirExcelComponent } from './subirExcel/subirExcel.component';

export const RelevoRoutes: Routes = [
   {
    path: '',
    children: [ {
      path: 'relevo',
      component: SubirExcelComponent
    }]
    }
];
