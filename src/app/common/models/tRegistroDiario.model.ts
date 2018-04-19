import {TPersonalRelevoHist} from './tPersonalRelevoHist.model';

export class TRegistroDiario {
    private _idRegDiar: number;
    private _personalRelevoId: TPersonalRelevoHist;
    private _reg1: string;
    private _reg2: string;
    private _reg3: string;
    private _habHotId: number;
    private _fechaRegistro: string;


    constructor() {
    }


    get idRegDiar(): number {
        return this._idRegDiar;
    }

    set idRegDiar(value: number) {
        this._idRegDiar = value;
    }

    get personalRelevoId(): TPersonalRelevoHist {
        return this._personalRelevoId;
    }

    set personalRelevoId(value: TPersonalRelevoHist) {
        this._personalRelevoId = value;
    }

    get reg1(): string {
        return this._reg1;
    }

    set reg1(value: string) {
        this._reg1 = value;
    }

    get reg2(): string {
        return this._reg2;
    }

    set reg2(value: string) {
        this._reg2 = value;
    }

    get reg3(): string {
        return this._reg3;
    }

    set reg3(value: string) {
        this._reg3 = value;
    }

    get habHotId(): number {
        return this._habHotId;
    }

    set habHotId(value: number) {
        this._habHotId = value;
    }

    get fechaRegistro(): string {
        return this._fechaRegistro;
    }

    set fechaRegistro(value: string) {
        this._fechaRegistro = value;
    }
}
