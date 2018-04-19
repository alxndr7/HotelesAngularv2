import { Routes } from '@angular/router';
import {PrincipalHotelComponent} from './principal/principal-hotel.component';
import {RegistroComponent} from './registro/registro.component';


export const AdminHotelRoutes: Routes = [
   {
    path: '',
    children: [
    /*    {
          path: 'admin-hotel',
          component: PrincipalHotelComponent
        },*/
        {
            path: 'registro',
            component: RegistroComponent
        }
    ]
    }
];
