import { Component, OnInit } from '@angular/core';
import {HotelesService} from '../../common/_services/hoteles.service';
import {  BlockUI, NgBlockUI } from 'ng-block-ui';
//import * as XLSX from 'ts-xlsx';
import * as XLSX from 'xlsx';
import {TPersonalRelevo} from '../../common/models/tPersonalRelevo.model';
declare var $: any;
declare interface TableData {
    headerRow: string[];
    /*dataRows: string[][];*/
    dataRows: any[];

}

type AOA = any[][];

@Component({
    selector: 'app-subir-excel',
    templateUrl: 'subirExcel.component.html'
})

export class SubirExcelComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    public tableData1: TableData;
    data: AOA = [ [1, 2], [3, 4] ];
    personalRelevo:  TPersonalRelevo[] = [];
    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = 'Libro1.xlsx';

    constructor(public _hotelesService: HotelesService) {
    }


    onFileChange(evt: any) {
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* save data */
            this.personalRelevo = XLSX.utils.sheet_to_json(ws,{raw:true});
            this.tableData1.dataRows = this.personalRelevo;
            console.log(this.personalRelevo);
            //console.log(XLSX.utils.sheet_to_json(ws,{raw:true}));
            this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
        };
        reader.readAsBinaryString(target.files[0]);
    }

    export(): void {
        /* generate worksheet */
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);
    }


    ngOnInit() {

        this.tableData1 = {
            headerRow: [ 'DNI', 'Nombre Completo', 'Puesto', 'Flota', 'Fecha Ingreso', 'Fecha Salida'],
            dataRows:  this.personalRelevo
        };

        //let wb: IWorkBook = read('Libro1.xlsx');
        //console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));

       /* var workbook = XLSX.read('Libro1.xlsx');
        var sheet_name_list = workbook.SheetNames;
        console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));*/
        //console.log(XLSX.utils.sheet_to_json(workbook,{raw:true}));

        /*var XLSX = require('xlsx');
        var workbook = XLSX.readFile('Libro1.xlsx');
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function(y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            var data = [];
            for(z in worksheet) {
                if(z[0] === '!') continue;
                //parse out the column, row, and value
                var col = z.substring(0,1);
                var row = parseInt(z.substring(1));
                var value = worksheet[z].v;

                //store header names
                if(row == 1) {
                    headers[col] = value;
                    continue;
                }

                if(!data[row]) data[row]={};
                data[row][headers[col]] = value;
            }
            //drop those first two rows which are empty
            data.shift();
            data.shift();
            console.log(data);
        });*/
    }

    subir_personal_relevo() {
        this.blockUI.start('Cargando...');
        console.log(this.personalRelevo);
        var cont = 1;
        for (let personal of this.personalRelevo) {
            this._hotelesService.insertPersonalRelevo(personal).subscribe(
                (data) => {
                    cont++;
                    console.log(data);
                    this.blockUI.stop();
                },
                err => {
                    this.blockUI.stop();
                    console.error(err);
                }
            );
            this.personalRelevo = null;
            this.tableData1.dataRows = this.personalRelevo;

        }
        console.log('inserts: ' + cont);
    }


}
