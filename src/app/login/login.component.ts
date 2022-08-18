import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	Role = Role;

	constructor(private router: Router, private authService: AuthService) {}

	ngOnInit() {
		//if sucessful login
	}

	login() {
		//this.authService.login(role);
		this.authService.googleSignin();
	}

	logout() {
		this.authService.logout();
	}
}
