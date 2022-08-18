import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Role } from '../../models/role';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	destroy$: Subject<boolean> = new Subject<boolean>();
	Role = Role;

	constructor(private router: Router, private authService: AuthService) {}

	//prefer active unsubscribing from all the hotpatch data
	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	ngOnInit() {}

	get isAuthorized() {
		return this.authService.isAuthorized();
	}

	get isUser() {
		return this.authService.hasRole(Role.User);
	}

	get isAdmin() {
		return this.authService.hasRole(Role.Admin);
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['login']);
	}
}
