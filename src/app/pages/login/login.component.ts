import { Component, OnInit, ElementRef } from '@angular/core';
import {AuthenticationService} from '../../common/_services/authentication.service';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';
import {  BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public user: any = <any>{};

    constructor(private element: ElementRef, public _authService: AuthenticationService,
                public _router: Router,
                public _locker: SessionStorageService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    }

    onSubmit(event: Event) {
        event.preventDefault();
        this.blockUI.start('Cargando...');
        console.log('luego de block UI');
        this._authService.validar_login(this.user.username, this.user.password).subscribe(
            (data) => {
                console.log(data);
                this._authService.user = data;
                this._authService.hasSession = true;
                this._locker.store('user', data);
                if (this._authService.user.rolUsuario === 'hotel')
                    this._router.navigate(['/Hoteles/auth/registro']);
                if (this._authService.user.rolUsuario === 'admin')
                    this._router.navigate(['/Hoteles/auth/dashboard']);

                this.blockUI.stop();
            },
            err => {
                console.error(err);
                this._authService.hasSession = false;
                this.blockUI.stop();
            }
        );
    }

  /*  onSubmit(event: Event) {
        event.preventDefault();
        console.log("login");
        //this._router.navigate(['/auth/dashboard']);
        this._authService.logIn(this.user.username, this.user.password, 'password').subscribe(
            (data) => {
                console.log(data);
                this._authService.user = data;
                this._authService.hasSession = true;
                this._locker.store('user', data);
                this._router.navigate(['/auth/dashboard']);
            },
            err => {
                console.error(err);
                this._authService.hasSession = false;
            }
        );
    }*/
}
