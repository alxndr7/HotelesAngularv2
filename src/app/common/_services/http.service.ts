import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../common/config';

@Injectable()
export class HttpService {
    apiBaseURL = Config.API_SERVER_URL;

    constructor(public _http: Http) {
    }

    public get(url, token): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Api-Token': token
        });
        const options = new RequestOptions({headers: headers});
        return this._http.get(url, options).map(response => response.json());
    }

    public get2(url, params): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({headers: headers, search: params});
        return this._http.get(url, options).map(response => response.json());
    }

    public get_prueba(url): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const options = new RequestOptions({headers: headers});
        return this._http.get(url, options).map(response => response.json());
    }


    public post(url, params, token?): Observable<any> {
        const headers = !!token ? new Headers({
            'Content-Type': 'application/json',
            'Api-Token': token
        }) : new Headers({'Content-Type': 'application/json'});

        const options = new RequestOptions({headers: headers});
        const body = JSON.stringify(params);

        return this._http.post(url, body, options).map(response => response.json());
    }

    public post_prueba(url, body): Observable<any> {
        const headers =  new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        const options = new RequestOptions({headers: headers}); /*const body = JSON.stringify(params);*/
        return this._http.post(url, body, options).map(response => response.json());
    }


    public post_login(username, password, grant_type, url): Observable<any> {
        const headers =  new Headers({
            'Authorization': 'Basic Y2xpZW50YXBwOnRyYW5zYWwzMzM=',
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        urlSearchParams.append('grant_type', grant_type);
        let body = urlSearchParams.toString();
        const options = new RequestOptions({headers: headers});

        return this._http.post(url, body, options).map(response => response.json());
    }


    public delete(url, token): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Api-Token': token
        });
        const options = new RequestOptions({headers: headers});

        return this._http.delete(url, options).map(response => response.json());
    }

}
