import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	Role = Role;

	constructor(private router: Router, private authService: AuthService) {}

	ngOnInit() {}

	get isAuthorized() {
		return this.authService.isAuthorized();
	}

	get isAdmin() {
		return this.authService.hasRole(Role.Admin);
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['login']);
	}
}
