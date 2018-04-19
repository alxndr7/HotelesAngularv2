export class VwPersonalHotelModel {
    private _personalRelevoId: number;
    private _nombreCompleto: string;
    private _dni: string;
    private _hotelNombre: string;
    private _hotelId: number;
    private _fechaIngreso: string;
    private _fechaSalida: string;
    private _habHotId: number;
    private _detNumHab: string;
    private _tipoHab: string;


    constructor() {
    }


    get personalRelevoId(): number {
        return this._personalRelevoId;
    }

    set personalRelevoId(value: number) {
        this._personalRelevoId = value;
    }

    get nombreCompleto(): string {
        return this._nombreCompleto;
    }

    set nombreCompleto(value: string) {
        this._nombreCompleto = value;
    }

    get dni(): string {
        return this._dni;
    }

    set dni(value: string) {
        this._dni = value;
    }

    get hotelNombre(): string {
        return this._hotelNombre;
    }

    set hotelNombre(value: string) {
        this._hotelNombre = value;
    }

    get habHotId(): number {
        return this._habHotId;
    }

    set habHotId(value: number) {
        this._habHotId = value;
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

    get hotelId(): number {
        return this._hotelId;
    }

    set hotelId(value: number) {
        this._hotelId = value;
    }
}
