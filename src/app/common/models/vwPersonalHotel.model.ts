export class MHotel {
    private _hotelId: number;
    private _hotelNombre: string;
    private _hotelNumHab: number;
    private _flota: string;
    private _estado: number;
    private _pisos: number;


    constructor() {
    }

    /*constructor(hotelId: number, hotelNombre: string, hotelNumHab: number, flota: string) {
        this._hotelId = hotelId;
        this._hotelNombre = hotelNombre;
        this._hotelNumHab = hotelNumHab;
        this._flota = flota;
    }*/

    get hotelId(): number {
        return this._hotelId;
    }

    set hotelId(value: number) {
        this._hotelId = value;
    }

    get hotelNombre(): string {
        return this._hotelNombre;
    }

    set hotelNombre(value: string) {
        this._hotelNombre = value;
    }

    get hotelNumHab(): number {
        return this._hotelNumHab;
    }

    set hotelNumHab(value: number) {
        this._hotelNumHab = value;
    }

    get flota(): string {
        return this._flota;
    }

    set flota(value: string) {
        this._flota = value;
    }

    get estado(): number {
        return this._estado;
    }

    set estado(value: number) {
        this._estado = value;
    }

    get pisos(): number {
        return this._pisos;
    }

    set pisos(value: number) {
        this._pisos = value;
    }
}
