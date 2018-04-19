import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HotelesService} from '../../common/_services/hoteles.service';
import {VwPersonalHotelModel} from '../../common/models/vwPersonalHotel.model';
declare var $: any;
declare interface TableData {
    headerRow: string[];
    /*dataRows: string[][];*/
    dataRows: any[];

}

@Component({
    selector: 'app-principal-hotel',
    templateUrl: 'principal-hotel.component.html'
})

export class PrincipalHotelComponent implements OnInit {
    public tableData1: TableData;
    personalHotel:  VwPersonalHotelModel[] = [];
    personalHotelSelect: VwPersonalHotelModel;
    @ViewChild('modalDesocuparHab') modalDesocuparHab: ElementRef;
    @ViewChild('closeModalDesocupar') closeModalDesocupar: ElementRef;
    textareaValue: string;


    constructor(public _hotelesService: HotelesService) {
        this.personalHotelSelect = new VwPersonalHotelModel();
        this.textareaValue = '';
    }

    ngOnInit() {

        this.tableData1 = {
            headerRow: [ 'DNI', 'Nombre Completo', 'Fecha Inicio', 'Fecha Salida','Hotel', 'Habitación', 'M', 'T', 'N'],
            dataRows:  this.personalHotel
        };

        this.get_relevo_personal();
    }

    get_relevo_personal() {
        this._hotelesService.getPersonalHotel().subscribe(
            (data) => {
                this.personalHotel = data;
                this.tableData1.dataRows = this.personalHotel;
            },
            err => {
                console.error(err);
            }
        );
    }

    modal_desocupar_habitacion(row){
        this.personalHotelSelect = row;
        this.textareaValue = '';
        this.modalDesocuparHab.nativeElement.click();
    }

    desocupar_habitacion(){

        this._hotelesService.desocuparHabitacion(this.personalHotelSelect.habHotId, this.personalHotelSelect.personalRelevoId ,this.textareaValue).subscribe(
            (data) => {
                console.log("update ok");
                this.closeModalDesocupar.nativeElement.click();
                this.get_relevo_personal();
            },
            err => {
                console.error(err);
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
