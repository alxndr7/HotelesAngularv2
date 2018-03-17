import { Routes } from '@angular/router';

import { ExtendedTableComponent } from './extendedtable/extendedtable.component';

export const TablesRoutes: Routes = [
   {
    path: '',
    children: [ {
      path: 'hoteles',
      component: ExtendedTableComponent
    }]
    }
];
