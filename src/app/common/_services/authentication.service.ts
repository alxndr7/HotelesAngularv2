import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {SessionStorageService} from 'ngx-webstorage';
import 'rxjs/add/operator/map';
import {Config} from '../config';


@Injectable()
export class AuthenticationService {
  hasSession = false;
  user;
  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService, public _locker: SessionStorageService) {
  }

  public isLoggedIn() {
    const user = this._locker.retrieve('user');
    if (!!user) {
      this.user = user;
      this.hasSession = true;
    }
    return this.hasSession;
  }

  public logIn(username: string, password: string, grant_type: string) {
    //const url = `${this.apiBaseURL}/users/login`;
    //const url = `${this.apiBaseURL}/oauth/token`;
    const url = `${this.apiBaseURL}/validar-usuario`;

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    urlSearchParams.append('grant_type', 'password');
    let body = urlSearchParams.toString();


    return this._http.post_login(username, password, grant_type, url);
  }

    public validar_login(username: string, password: string) {

        const url = `${this.apiBaseURL}/validar-usuario`;

        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('usuUsuario', username);
        urlSearchParams.append('passwUsuario', password);
        let body = urlSearchParams.toString();
        return this._http.post_prueba(url, body);
    }

  public logout() {
    this.user = null;
    this.hasSession = false;
    this._locker.clear('user');
  }

}
