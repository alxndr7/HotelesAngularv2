import {THabitacionHotelDet} from './tHabitacionHotelDet.model';

export class TPersonalRelevo {
    private _personalRelevoId: number;
    private _dni: string;
    private _nombreCompleto: string;
    private _puesto: string;
    private _flota: string;
    private _fechaIngreso: string;
    private _fechaSalida: string;
    private _habHotId: number;
    private _habDet: THabitacionHotelDet;
    private _orden: number;

    constructor() {
        /*this._habDet = new THabitacionHotelDet();*/
    }

    /*constructor(personalRelevoId: number, dni: string, nombreCompleto: string, puesto: string,
                flota: string, fechaIngreso: string, fechaSalida: string, habHotId: number) {
        this._personalRelevoId = personalRelevoId;
        this._dni = dni;
        this._nombreCompleto = nombreCompleto;
        this._puesto = puesto;
        this._flota = flota;
        this._fechaIngreso = fechaIngreso;
        this._fechaSalida = fechaSalida;
        this._habHotId = habHotId;
    }*/

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

    get habDet(): THabitacionHotelDet {
        return this._habDet;
    }

    set habDet(value: THabitacionHotelDet) {
        this._habDet = value;
    }

    get orden(): number {
        return this._orden;
    }

    set orden(value: number) {
        this._orden = value;
    }
}
