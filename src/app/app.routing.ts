import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import {AuthGuard} from './common/_guards';

export const AppRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'public/login' },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: 'auth',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'auth',
                loadChildren: './tables/tables.module#TablesModule'
            },
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'public',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    }
];