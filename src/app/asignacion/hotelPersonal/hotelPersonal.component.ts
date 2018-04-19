import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HotelesService} from '../../common/_services/hoteles.service';
import {TPersonalRelevo} from '../../common/models/tPersonalRelevo.model';
import {MHotel} from '../../common/models/mHotel.model';
import {MHotelMap} from '../../common/models/mHotelMap.model';
import {THabitacionHotelDet} from '../../common/models/tHabitacionHotelDet.model';
import {  BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any;
declare interface TableData {
    headerRow: string[];
    /*dataRows: string[][];*/
    dataRows: any[];

}

@Component({
    selector: 'app-asign-hotel-personal',
    templateUrl: 'hotelPersonal.component.html'
})

export class HotelPersonalComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    public tableData1: TableData;
    personalRelevo:  TPersonalRelevo[] = [];
    nuevoPersonalR: TPersonalRelevo;
    @ViewChild('modalverdisponibilidad') modalverdisponibilidad: ElementRef;
    @ViewChild('closeModalDispo') closemodaldispo: ElementRef;
    @ViewChild('closeNuevoPersonalAsign') closeNuevoPersonalAsign: ElementRef;

    flota_pers: string;
    hotelesPorFlota: MHotel[];
    objHotelDet: MHotelMap;
    hotelSelect: string;
    habitacionHotel: string;
    idHabHot: number;
    personalSelect: TPersonalRelevo;
    habSelect:THabitacionHotelDet;

    showAsignar: boolean;

    constructor(public _hotelesService: HotelesService) {
        this.objHotelDet = new MHotelMap();
        this.nuevoPersonalR = new TPersonalRelevo();
        this.hotelSelect = '';
        this.habitacionHotel = '';
        this.idHabHot = 0;
        this.personalSelect =  new TPersonalRelevo();
        this.personalSelect.habDet = new THabitacionHotelDet();
        this.personalSelect.habDet.hotel = new MHotel();
        this.showAsignar = true;
    }

    ngOnInit() {

        this.tableData1 = {
            headerRow: [ 'DNI', 'Nombre Completo', 'Puesto', 'Flota', 'Fecha Ingresos', 'Fecha Salida', 'Habitación', 'Acción'],
            dataRows:  this.personalRelevo
        };

        this.get_relevo_personal();
    }

    get_relevo_personal() {
        this.blockUI.start('Cargando...');
        this._hotelesService.getPersonalRelevo().subscribe(
            (data) => {
                this.personalRelevo = data;
                this.tableData1.dataRows = this.personalRelevo;
                this.blockUI.stop();
            },
            err => {
                console.error(err);
                this.blockUI.stop();
            }
        );
    }


    ver_disponibilidad(personal) {
        console.log(personal);
        this.objHotelDet = new MHotelMap();
        this.personalSelect =  new TPersonalRelevo();
        this.personalSelect.habDet = new THabitacionHotelDet();
        this.personalSelect.habDet.hotel = new MHotel();

        this.personalSelect = personal;
        if (this.personalSelect.habDet == null) {
            this.hotelSelect = 'No Asignado';
            this.habitacionHotel = 'No Asignado';
        }
        else {
            this.habitacionHotel = this.personalSelect.habDet.detNumHab;
            this.hotelSelect = this.personalSelect.habDet.hotel.hotelNombre;
        }

        if (this.personalSelect.habHotId) {
            this.showAsignar = false;
            console.log('true');
        }
        else {
            this.blockUI.start('Cargando...');
            this.showAsignar = true;
            this._hotelesService.getHotelesPorFlota(personal.flota).subscribe(
                (data) => {
                    this.hotelesPorFlota = data;
                    console.log(data);
                    this.blockUI.stop();
                }, err => {
                    this.blockUI.stop();
                    console.error(err);
                }
            );
        }
        console.log(personal.personalRelevoId + '/' + personal.flota);
        this.flota_pers = personal.flota ;
        this.modalverdisponibilidad.nativeElement.click();
    }

    modal_nuevo_ingreso() {
        this.nuevoPersonalR = new TPersonalRelevo();
    }

    guardar_nueva_asignacion_personal() {
        this.blockUI.start('Cargando...');
        this._hotelesService.insertNuevoPersonalRelevo(this.nuevoPersonalR).subscribe(
            (data) => {
                console.log(data);
                this.get_relevo_personal();
                this.closeNuevoPersonalAsign.nativeElement.click();
                this.blockUI.stop();
                },
            err => {
                console.error(err);
                this.blockUI.stop();
            }
        );
    }

    onChange(id_hotel) {
        console.log(id_hotel);
        this.blockUI.start('Cargando...');
        this._hotelesService.getHotelDetPorIdDisp(id_hotel).subscribe(
            (data) => {
                console.log(data);
                this.objHotelDet = data[0];
                this.blockUI.stop();
            }, err => {
                this.blockUI.stop();
                console.error(err);
            }
        );
    }

    set_id_hab_hot(id_hab_hot){
        this.idHabHot = id_hab_hot;
        console.log(this.idHabHot);
    }

  /*  asignar_habitacion_personal() {
        console.log(this.idHabHot + '/' +
            this.personalSelect.personalRelevoId  + '/' +
            this.personalSelect.fechaIngreso  + '/' +
            this.personalSelect.fechaSalida);

        this._hotelesService.updateAsignHabHotel(this.idHabHot,
            this.personalSelect.personalRelevoId,
            this.personalSelect.fechaIngreso,
            this.personalSelect.fechaSalida).subscribe(
            (data) => {
                console.log(data);
                this.update_personal_habitacion(this.idHabHot, this.personalSelect.personalRelevoId);
            }, err => {
                console.error(err);
            }
        );
    }*/

    asignar_habitacion_personal() {
        this.blockUI.start('Cargando...');
        this._hotelesService.updatePersonalHabitacion(this.idHabHot, this.personalSelect.personalRelevoId).subscribe(
            (data) => {
                console.log(data);
                this.get_relevo_personal();
                this.closemodaldispo.nativeElement.click();
                this.blockUI.stop();
            }, err => {
                console.error(err);
                this.blockUI.stop();
            }
        );
    }

}
