import {THabitacionHotelDet} from './tHabitacionHotelDet.model';

export class TPersonalRelevoHist {
    private _personalRelevoId: number;
    private _dni: string;
    private _nombreCompleto: string;
    private _puesto: string;
    private _flota: string;
    private _fechaIngreso: string;
    private _fechaSalida: string;
    private _habHotId: number;

    constructor() {
    }


    get personalRelevoId(): number {
        return this._personalRelevoId;
    }

    set personalRelevoId(value: number) {
        this._personalRelevoId = value;
    }

    get dni(): string {
        return this._dni;
    }

    set dni(value: string) {
        this._dni = value;
    }

    get nombreCompleto(): string {
        return this._nombreCompleto;
    }

    set nombreCompleto(value: string) {
        this._nombreCompleto = value;
    }

    get puesto(): string {
        return this._puesto;
    }

    set puesto(value: string) {
        this._puesto = value;
    }

    get flota(): string {
        return this._flota;
    }

    set flota(value: string) {
        this._flota = value;
    }

    get fechaIngreso(): string {
        return this._fechaIngreso;
    }

    set fechaIngreso(value: string) {
        this._fechaIngreso = value;
    }

    get fechaSalida(): string {
        return this._fechaSalida;
    }

    set fechaSalida(value: string) {
        this._fechaSalida = value;
    }

    get habHotId(): number {
        return this._habHotId;
    }

    set habHotId(value: number) {
        this._habHotId = value;
    }
}
