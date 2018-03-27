import { Injectable } from '@angular/core';
import {Config} from '../config';
import {HttpService} from './http.service';
import {SessionStorageService} from 'ngx-webstorage';
import {MHotel} from '../models/mHotel.model';
import {TPisosHotel} from '../models/tPisosHotel.model';
import {TPersonalRelevo} from '../models/tPersonalRelevo.model';

@Injectable()
export class HotelesService {

    apiBaseURL: string = Config.API_SERVER_URL;

    constructor(public _http: HttpService, public _locker: SessionStorageService) {
    }

    public getHotelPorId(id_hotel) {
        const url = `${this.apiBaseURL}/hotelesPorId`;
        return this._http.get2(url, {
            'id': id_hotel
        });
    }

    public  getHotelDetPorId(id_hotel){
        const url = `${this.apiBaseURL}/hotelDetallePorId`;
        return this._http.get2(url, {
            'id': id_hotel
        });
    }

    public  getHotelDetPorIdDisp(id_hotel){
        const url = `${this.apiBaseURL}/hotelDetallePorIdDisp`;
        return this._http.get2(url, {
            'id': id_hotel
        });
    }

    public  getHotelesPorFlota(flota){
        const url = `${this.apiBaseURL}/hoteles-flota`;
        return this._http.get2(url, {
            'flota': flota
        });
    }

    public getAllHoteles() {
        const url = `${this.apiBaseURL}/hoteles`;
        return this._http.get_prueba(url);
    }
    public insertHotel(hotel: MHotel) {
        const url = `${this.apiBaseURL}/insertHotel`;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', String (hotel.hotelId));
        urlSearchParams.append('nombre', hotel.hotelNombre);
        urlSearchParams.append('numHab', String(hotel.hotelNumHab));
        urlSearchParams.append('flota', hotel.flota);
        urlSearchParams.append('estado', '1');
        urlSearchParams.append('pisos', String(hotel.pisos));
        const body = urlSearchParams.toString();

        return this._http.post_prueba(url, body);
    }

    public insertPiso(piso: TPisosHotel) {
       /* const url = `${this.apiBaseURL}/insertPisoHotel`;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('hotelId', String (piso.hotelId));
        urlSearchParams.append('piso', String (piso.piso));
        urlSearchParams.append('numHabPiso', String(piso.numHabPiso));
        const body = urlSearchParams.toString();

        return this._http.post_prueba(url, body);*/
    }

    public getPersonalRelevo() {
        const url = `${this.apiBaseURL}/personal-relevo`;
        return this._http.get_prueba(url);
    }

    public insertPersonalRelevo(personal: TPersonalRelevo) {
        const url = `${this.apiBaseURL}/insertPersonalRelevo`;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('dni', personal.dni);
        urlSearchParams.append('nombreCompleto', personal.nombreCompleto);
        urlSearchParams.append('puesto', personal.puesto);
        urlSearchParams.append('flota', personal.flota);
        urlSearchParams.append('fechaIngreso', personal.fechaIngreso);
        urlSearchParams.append('fechaSalida', personal.fechaSalida);
        const body = urlSearchParams.toString();

        return this._http.post_prueba(url, body);
    }


    public updateHotel(hotel: MHotel) {
        const url = `${this.apiBaseURL}/updateHotel`;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', String (hotel.hotelId));
        urlSearchParams.append('nombre', hotel.hotelNombre);
        urlSearchParams.append('numHab', String(hotel.hotelNumHab));
        urlSearchParams.append('flota', hotel.flota);
        urlSearchParams.append('estado', '1');
        urlSearchParams.append('pisos', String(hotel.pisos));
        const body = urlSearchParams.toString();

        return this._http.post_prueba(url, body);
    }


    public updateAsignHabHotel(id_hab_hotel, id_personal, fecha_inicio, fecha_fin) {
        const url = `${this.apiBaseURL}/updateHabHot`;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', String (id_hab_hotel));
        urlSearchParams.append('idPersonal', String(id_personal));
        urlSearchParams.append('fechaIni', fecha_inicio);
        urlSearchParams.append('fechaFin', fecha_fin);
        const body = urlSearchParams.toString();

        return this._http.post_prueba(url, body);
    }

    public updatePersonalHabitacion(id_hab_hotel, id_personal) {
        const url = `${this.apiBaseURL}/updatePersonalHabitacion`;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('personalRelevoId', String (id_personal));
        urlSearchParams.append('habHotId', String(id_hab_hotel));
        const body = urlSearchParams.toString();

        return this._http.post_prueba(url, body);
    }

    public deleteHotel(id_hotel: number) {
        const url = `${this.apiBaseURL}/deleteHotel`;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', String (id_hotel));
        const body = urlSearchParams.toString();

        return this._http.post_prueba(url, body);
    }
}
