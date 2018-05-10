import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HotelesService} from '../../common/_services/hoteles.service';
import {VwPersonalHotelModel} from '../../common/models/vwPersonalHotel.model';
import {  BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any;
declare interface TableData {
    headerRow: string[];
    /*dataRows: string[][];*/
    dataRows: any[];

}

@Component({
    selector: 'app-desocupar-habitacion',
    templateUrl: 'desocuparHabitacion.component.html'
})

export class DesocuparHabitacionComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    public tableData1: TableData;
    personalHotel:  VwPersonalHotelModel[] = [];
    personalHotelSelect: VwPersonalHotelModel;
    @ViewChild('modalDesocuparHab') modalDesocuparHab: ElementRef;
    @ViewChild('closeModalDesocupar') closeModalDesocupar: ElementRef;
    textareaValue: string;
    public searchString: string;


    constructor(public _hotelesService: HotelesService) {
        this.personalHotelSelect = new VwPersonalHotelModel();
        this.textareaValue = '';
    }

    ngOnInit() {

        this.tableData1 = {
            headerRow: [ 'DNI', 'Nombre Completo', 'Fecha Inicio', 'Fecha Salida','Hotel', 'Habitación', 'Acción'],
            dataRows:  this.personalHotel
        };

        this.get_relevo_personal();
    }

    get_relevo_personal() {
        this.blockUI.start('Cargando...');
        this._hotelesService.getPersonalHotel().subscribe(
            (data) => {
                this.personalHotel = data;
                this.tableData1.dataRows = this.personalHotel;
                this.blockUI.stop();
            },
            err => {
                console.error(err);
                this.blockUI.stop();
            }
        );
    }

    modal_desocupar_habitacion(row){
        this.personalHotelSelect = row;
        this.textareaValue = '';
        this.modalDesocuparHab.nativeElement.click();
    }

    desocupar_habitacion(){
        this.blockUI.start('Cargando...');
        this._hotelesService.desocuparHabitacion(this.personalHotelSelect.habHotId, this.personalHotelSelect.personalRelevoId ,this.textareaValue).subscribe(
            (data) => {
               console.log("update ok");
                this.closeModalDesocupar.nativeElement.click();
                this.get_relevo_personal();
                this.blockUI.stop();
            },
            err => {
                console.error(err);
                this.blockUI.stop();
            }
        );
    }

    doTextareaValueChange(ev) {
        try {
            this.textareaValue = ev.target.value;
        } catch(e) {
            console.info('could not set textarea-value');
        }
    }



}
