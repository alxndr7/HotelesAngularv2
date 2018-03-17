import { Injectable } from '@angular/core';
import {Config} from '../config';
import {SessionStorageService} from 'ngx-webstorage';
import {HttpService} from './http.service';

@Injectable()
export class DashboardService {

    apiBaseURL: string = Config.API_SERVER_URL;

    constructor(public _http: HttpService, public _locker: SessionStorageService) {
    }

    public getHoteles() {
        const url = `${this.apiBaseURL}/hoteles`;
        return this._http.get_prueba(url);
    }
}
