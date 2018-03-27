import {MHotel} from './mHotel.model';

export class THabitacionHotelDet {
    private _habHotId: number;
    private _hotelId: number;
    private _hotel: MHotel;
    private _pisosHotelId: number;
    private _detNumHab: string;
    private _tipoHab: string;
    private _estadoHab: string;
    private _personalRelevoId: number;
    private _fechaIniOcupa: string;
    private _fechaFinOcupa: string;
    private _estadoOcupa: string;


    constructor() {
    }

    get habHotId(): number {
        return this._habHotId;
    }

    set habHotId(value: number) {
        this._habHotId = value;
    }

    get hotelId(): number {
        return this._hotelId;
    }

    set hotelId(value: number) {
        this._hotelId = value;
    }

    get hotel(): MHotel {
        return this._hotel;
    }

    set hotel(value: MHotel) {
        this._hotel = value;
    }

    get pisosHotelId(): number {
        return this._pisosHotelId;
    }

    set pisosHotelId(value: number) {
        this._pisosHotelId = value;
    }

    get detNumHab(): string {
        return this._detNumHab;
    }

    set detNumHab(value: string) {
        this._detNumHab = value;
    }

    get tipoHab(): string {
        return this._tipoHab;
    }

    set tipoHab(value: string) {
        this._tipoHab = value;
    }

    get estadoHab(): string {
        return this._estadoHab;
    }

    set estadoHab(value: string) {
        this._estadoHab = value;
    }

    get personalRelevoId(): number {
        return this._personalRelevoId;
    }

    set personalRelevoId(value: number) {
        this._personalRelevoId = value;
    }

    get fechaIniOcupa(): string {
        return this._fechaIniOcupa;
    }

    set fechaIniOcupa(value: string) {
        this._fechaIniOcupa = value;
    }

    get fechaFinOcupa(): string {
        return this._fechaFinOcupa;
    }

    set fechaFinOcupa(value: string) {
        this._fechaFinOcupa = value;
    }

    get estadoOcupa(): string {
        return this._estadoOcupa;
    }

    set estadoOcupa(value: string) {
        this._estadoOcupa = value;
    }
}
