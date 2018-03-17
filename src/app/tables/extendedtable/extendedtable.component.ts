import { Component, OnInit } from '@angular/core';
import {HotelesService} from '../../common/_services/hoteles.service';
import {MHotel} from '../../common/models/mHotel.model';
import { ViewChild, ElementRef} from '@angular/core';
import swal from "sweetalert2";

declare var $: any;
declare interface TableData {
    headerRow: string[];
    /*dataRows: string[][];*/
    dataRows: any[];

}
@Component({
    selector: 'app-extended-table-cmp',
    templateUrl: 'extendedtable.component.html'
})

export class ExtendedTableComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;
    @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
    @ViewChild('modaleditarhotel') modaleditarhotel: ElementRef;
    @ViewChild('closeeditmodal') closeeditmodal: ElementRef;

    listHoteles: MHotel[];
    listPisos:
    objhotel: MHotel;
    objhoteleditar: MHotel;


    constructor(public _hotelesService: HotelesService) {
        this.objhotel = new MHotel();
        this.objhoteleditar = new MHotel();
    }
    ngOnInit() {

        this.get_all_hoteles();
    }

    insertar_hotel() {
        console.log(this.objhotel.hotelNombre + '/' + this.objhotel.hotelNumHab + '/' + this.objhotel.flota + '/' + this.objhotel.pisos);
        this.objhotel.hotelId = 111;
        this._hotelesService.insertHotel(this.objhotel).subscribe(
            (data) => {
                console.log(data);
                this.closeAddExpenseModal.nativeElement.click();
                this.get_all_hoteles();
            },
            err => {
                console.error(err);
            }
        );
    }

    update_hotel() {
        console.log(this.objhoteleditar);
        this._hotelesService.updateHotel(this.objhoteleditar).subscribe(
            (data) => {
                console.log(data);
                this.closeeditmodal.nativeElement.click();
                this.get_all_hoteles();
            },
            err => {
                console.error(err);
            }
        );
    }

    delete_hotel(id_hotel,nombre_hotel){
        let that = this;
        console.log(id_hotel);
        swal({
            title: 'Estas seguro?',
            text: '¿Deseas eliminar ' + nombre_hotel +"? Estos cambios no se podrán revertir!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'No',
            confirmButtonText: 'Si, borrar esto!',
            buttonsStyling: false
        }).then(function(result) {
            console.log(result);
            if (result) {
                that._hotelesService.deleteHotel(id_hotel).subscribe(
                    (data) => {
                        console.log(data);
                        swal({
                            title: '¡Eliminado!',
                            text: nombre_hotel + ' a sido eliminado.',
                            type: 'success',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                        that.get_all_hoteles();
                    },
                    err => {
                        console.error(err);
                    }
                );
            }
        }).catch(swal.noop);
    }

    get_all_hoteles() {
        this._hotelesService.getAllHoteles().subscribe(
            (data) => {
                console.log(data);
                this.listHoteles = data;
                console.log(this.listHoteles);
                this.tableData1 = {
                    headerRow: [ '#', 'Nombre', 'Habitaciones','Pisos', 'Flota', 'Acciones'],
                    dataRows:  this.listHoteles.filter(hotelItem => hotelItem)
                };
            },
            err => {
                console.error(err);
            }
        );
    }

    get_pisos_hotel(id_hotel){
        this._hotelesService.getHotelPorId(id_hotel).subscribe(
            (data) => {
                this.objhoteleditar = data[0];
                this.tableData1 = {
                    headerRow: [ 'Piso #', 'Num Habitaciones', 'Acciones'],
                    dataRows:  this.listHoteles.filter(hotelItem => hotelItem)
                };
                this.modaleditarhotel.nativeElement.click();
            },
            err => {
                console.error(err);
            }
        );


        console.log(id_hotel);
    }


    get_hotel_por_id(id_hotel){
        this._hotelesService.getHotelPorId(id_hotel).subscribe(
            (data) => {
                console.log(data[0]);
                this.objhoteleditar = data[0];
                console.log(this.objhoteleditar);
                this.modaleditarhotel.nativeElement.click();
            },
            err => {
                console.error(err);
            }
        );


        console.log(id_hotel);
    }

}
