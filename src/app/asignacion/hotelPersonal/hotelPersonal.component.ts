import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HotelesService} from '../../common/_services/hoteles.service';
import {TPersonalRelevo} from '../../common/models/tPersonalRelevo.model';
import {MHotel} from '../../common/models/mHotel.model';
import {MHotelMap} from '../../common/models/mHotelMap.model';
import {THabitacionHotelDet} from '../../common/models/tHabitacionHotelDet.model';
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
    public tableData1: TableData;
    personalRelevo:  TPersonalRelevo[] = [];
    @ViewChild('modalverdisponibilidad') modalverdisponibilidad: ElementRef;
    @ViewChild('closeModalDispo') closemodaldispo: ElementRef;

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
        this._hotelesService.getPersonalRelevo().subscribe(
            (data) => {
                this.personalRelevo = data;
                this.tableData1.dataRows = this.personalRelevo;
            },
            err => {
                console.error(err);
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
            this.showAsignar = true;
            this._hotelesService.getHotelesPorFlota(personal.flota).subscribe(
                (data) => {
                    this.hotelesPorFlota = data;
                    console.log(data);
                }, err => {
                    console.error(err);
                }
            );
        }
        console.log(personal.personalRelevoId + '/' + personal.flota);
        this.flota_pers = personal.flota ;
        this.modalverdisponibilidad.nativeElement.click();
    }

    onChange(id_hotel) {
        console.log(id_hotel);

        this._hotelesService.getHotelDetPorIdDisp(id_hotel).subscribe(
            (data) => {
                console.log(data);
                this.objHotelDet = data[0];
            }, err => {
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
        this._hotelesService.updatePersonalHabitacion(this.idHabHot, this.personalSelect.personalRelevoId).subscribe(
            (data) => {
                console.log(data);
                this.get_relevo_personal();
                this.closemodaldispo.nativeElement.click();
            }, err => {
                console.error(err);
            }
        );
    }

}
