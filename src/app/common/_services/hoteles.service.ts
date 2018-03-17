import { Injectable } from '@angular/core';
import {Config} from '../config';
import {HttpService} from './http.service';
import {SessionStorageService} from 'ngx-webstorage';
import {MHotel} from '../models/mHotel.model';

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

    public deleteHotel(id_hotel: number) {
        const url = `${this.apiBaseURL}/deleteHotel`;
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', String (id_hotel));
        const body = urlSearchParams.toString();

        return this._http.post_prueba(url, body);
    }
}
