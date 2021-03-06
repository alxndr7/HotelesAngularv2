import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {SessionStorageService} from 'ngx-webstorage';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items

export const ROUTES: RouteInfo[] = [
    { path: '/Hoteles/auth/dashboard', title: 'Principal',  type: 'link', icontype: 'dashboard'},
    { path: '/Hoteles/auth/hoteles', title: 'Mantenimiento Hoteles',  type: 'link',  icontype: 'business'},
    { path: '/Hoteles/auth/relevo', title: 'Relevo',   type: 'link', icontype: 'swap_horiz' },
    { path: '/Hoteles/auth/asignacion', title: 'Asignación',   type: 'link', icontype: 'assignment'},
    { path: '/Hoteles/auth/liberarHabitacion', title: 'Liberar Habitacion',   type: 'link', icontype: 'next_week'},
  /*  { path: '/auth/reporte', title: 'Reportessss',   type: 'link', icontype: 'web' },*/
    {
        path: '/Hoteles/auth',
        title: 'Reportes',
        type: 'sub',
        icontype: 'web',
        collapse: 'Reportes',
        children: [
            {path: 'reporte', title: 'Reporte Diario Relevo', ab:'RD'},
        ]
    },

    {
        path: '/Hoteles/auth',
        title: 'Administrar',
        type: 'sub',
        icontype: 'assignment_ind',
        collapse: 'Administrar',
        children: [
            {path: 'registro', title: 'Registro Diario', ab:'RE'},
            /*{path: 'admin-hotel', title: 'Consolidado Diario', ab:'CD'}*/
        ]
    },

    /* { path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
     { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
     { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
  /*  { path: '/auth/admin-hotel', title: 'Administrar Hotel',   type: 'link', icontype: 'assignment_ind' },*/
];

export const ROUTES2: RouteInfo[] = [
    {
        path: '/Hoteles/auth',
        title: 'Administrar',
        type: 'sub',
        icontype: 'assignment_ind',
        collapse: 'Administrar',
        children: [
            {path: 'registro', title: 'Registro Diario', ab:'RE'},
            /*{path: 'admin-hotel', title: 'Consolidado Diario', ab:'CD'}*/
        ]
    }
];

/*export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    },{
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'forms',
        children: [
            {path: 'regular', title: 'Regular Forms', ab:'RF'},
            {path: 'extended', title: 'Extended Forms', ab:'EF'},
            {path: 'validation', title: 'Validation Forms', ab:'VF'},
            {path: 'wizard', title: 'Wizard', ab:'W'}
        ]
    },{
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'tables',
        children: [
            {path: 'regular', title: 'Regular Tables', ab:'RT'},
            {path: 'extended', title: 'Extended Tables', ab:'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
        ]
    },{
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        children: [
            {path: 'google', title: 'Google Maps', ab:'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
            {path: 'vector', title: 'Vector Map', ab:'VM'}
        ]
    },{
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    },{
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    },{
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    },{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab:'P'},
            {path: 'timeline', title: 'Timeline Page', ab:'TP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
            {path: 'user', title: 'User Page', ab:'UP'}
        ]
    }
];*/
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(public _locker: SessionStorageService) {

    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        const user = this._locker.retrieve('user');
        console.log(user['rolUsuario']);
        if (user['rolUsuario'] === 'admin')
            this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (user['rolUsuario'] === 'hotel')
            this.menuItems = ROUTES2.filter(menuItem => menuItem);
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
