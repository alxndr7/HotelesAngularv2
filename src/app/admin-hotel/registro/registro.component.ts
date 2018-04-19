import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HotelesService} from '../../common/_services/hoteles.service';
import {TRegistroDiario} from '../../common/models/tRegistroDiario.model';
import swal from 'sweetalert2';
import {SessionStorageService} from 'ngx-webstorage';
import {  BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any;
declare interface TableData {
    headerRow: string[];
    /*dataRows: string[][];*/
    dataRows: any[];

}

@Component({
    selector: 'app-registro-hotel',
    templateUrl: 'registro.component.html'
})

export class RegistroComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    public tableData1: TableData;
    public flag_select_tipo: boolean;
    public registroDiarioHotel: TRegistroDiario[];
    public searchString: string;
    public selectTipo: string;
    public notificacion: boolean;
    public isOn: boolean;

    constructor(public _hotelesService: HotelesService, public _locker: SessionStorageService) {
        this.flag_select_tipo = true;
        this.notificacion = false;
        this.isOn = false;
    }

    ngOnInit() {
        const user = this._locker.retrieve('user');
        this.tableData1 = {
            headerRow: [ 'DNI', 'Nombre Completo', 'Fecha Inicio', 'Fecha Salida', 'M', 'T', 'N'],
            dataRows:  this.registroDiarioHotel
        };

        this.get_registro_diario(user['hotelId']);
    }

    cambiar_tipo(val) {
        this.selectTipo = val;
        if (val == 0)
            this.flag_select_tipo = true;
        else
            this.flag_select_tipo = false;
    }

    get_registro_diario(hotelId) {
        this.blockUI.start('Cargando...');
        if (+hotelId === 0) {
            this._hotelesService.getRegistroDiarioHotelAll().subscribe(
                (data) => {
                    this.registroDiarioHotel = data;
                    this.tableData1.dataRows = this.registroDiarioHotel;
                    this.blockUI.stop();
                },
                err => {
                    console.error(err);
                    this.blockUI.stop();
                }
            );
        }
        else {
            this._hotelesService.getRegistroDiarioHotel(hotelId).subscribe(
                (data) => {
                    this.registroDiarioHotel = data;
                    this.tableData1.dataRows = this.registroDiarioHotel;
                    this.blockUI.stop();
                },
                err => {
                    console.error(err);
                    this.blockUI.stop();
                }
            );
        }
    }

    buscar_dni() {
        var index = this.tableData1.dataRows.findIndex(x=>x.personalRelevoId['dni'] === this.searchString);
        console.log('index' + index);
        if (index != -1) {
            if (+this.selectTipo == 1) {
                if (this.tableData1.dataRows[index].reg1 == 0)
                    this.update_reg(index ,1);
                else
                    this.mensaje_error();
            }
            if (+this.selectTipo == 2) {
                if (this.tableData1.dataRows[index].reg2 == 0)
                    this.update_reg(index ,2);
                else
                    this.mensaje_error();
            }
            if (+this.selectTipo == 3) {
                if (this.tableData1.dataRows[index].reg3 == 0)
                    this.update_reg(index ,3);
                else
                    this.mensaje_error();
            }
        } else {
            console.log("llego");
            this.notificacion = false;
            this.isOn = true;
            this.dismissNotificacion();
        }
    }
    update_reg(i, t) {
        //var reg_diario = this.tableData1.dataRows.find(x => x.personalRelevoId['dni'] === this.searchString);
        this.blockUI.start('Cargando...');
        var id = this.tableData1.dataRows[i].idRegDiar;
        var tipo = t;
        this._hotelesService.updateReg(id, tipo).subscribe(
            (data) => {
                if (+tipo === 1)
                    this.tableData1.dataRows[i].reg1 = 1;
                if (+tipo === 2)
                    this.tableData1.dataRows[i].reg2 = 1;
                if (+tipo === 3)
                    this.tableData1.dataRows[i].reg3 = 1;

                this.notificacion = true;
                this.isOn = true;
                this.dismissNotificacion();
                this.blockUI.stop();
                console.log(this.tableData1.dataRows[i]);
            },
            err => {
                console.error(err);
                this.blockUI.stop();
            }
        );
    }

    public dismissNotificacion(){
        setTimeout(function() {
            this.isOn = false;
        }.bind(this), 1500);
    }

    mensaje_error() {
        swal({
            title: 'El persona ya se registro en el horario indicado',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success'
        }).catch(swal.noop);
    }

}
