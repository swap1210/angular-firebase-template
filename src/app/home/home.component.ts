import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	constructor(public auth: AuthService, public comm: CommonService) {}

	ngOnInit() {
		// this.auth.anonymousLogin();
		this.auth.user$?.subscribe((usr) => {
			console.log('User ', usr);
			//sign in anonymously if not logged in
			if (!usr) {
				this.auth.anonymousLogin();
			} else {
				//once logged in start getting property
			}
		});
	}
}
