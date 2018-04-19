import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import {AuthGuard} from './common/_guards';
import {AdminHotelModule} from './admin-hotel/admin-hotel.module';

export const AppRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'Hoteles/public/login' },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: 'Hoteles/auth',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'Hoteles/auth',
                loadChildren: './tables/tables.module#TablesModule'
            },
            {
                path: 'Hoteles/auth',
                loadChildren: './relevo/relevo.module#RelevoModule'
            },
            {
                path: 'Hoteles/auth',
                loadChildren: './asignacion/asignacion.module#AsignacionModule'
            },
            {
                path: 'Hoteles/auth',
                loadChildren: './liberarHabitacion/liberarHabitacion.module#LiberarHabitacionModule'
            },
            {
                path: 'Hoteles/auth',
                loadChildren: './reportes/reportes.module#ReportesModule'
            },
            {
                path: 'Hoteles/auth',
                loadChildren: './admin-hotel/admin-hotel.module#AdminHotelModule'
            },
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'Hoteles/public',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    }
];
