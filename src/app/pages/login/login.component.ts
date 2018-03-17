import { Component, OnInit, ElementRef } from '@angular/core';
import {AuthenticationService} from '../../common/_services/authentication.service';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    private user: any = <any>{};

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
    }
}
