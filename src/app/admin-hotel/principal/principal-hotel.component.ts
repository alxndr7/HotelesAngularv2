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

    constructor(public _hotelesService: HotelesService) {
    }

    ngOnInit() {
    }
}
