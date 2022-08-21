import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Notification } from 'src/app/models/notification';
import { CommonService } from 'src/app/services/common.service';
import { Role } from '../../models/role';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	destroy$: Subject<boolean> = new Subject<boolean>();
	isAuthorized = false;
	isUser = false;
	isAdmin = false;
	notifications: Notification[] = [];

	constructor(
		private router: Router,
		private authService: AuthService,
		private commData: CommonService
	) {}

	ngOnInit() {
		this.authService.user$
			.pipe(takeUntil(this.destroy$))
			.subscribe((userObj_in_header) => {
				if (!!userObj_in_header) {
					this.isAuthorized = userObj_in_header?.role >= Role.Visitor;
					this.isUser = userObj_in_header?.role == Role.User;
					this.isAdmin = userObj_in_header?.role == Role.Admin;
				} else {
					this.isAuthorized = false;
					this.isUser = false;
					this.isAdmin = false;
				}
			});

		this.commData.body$
			.pipe(takeUntil(this.destroy$))
			.subscribe((userObj_in_body) => {
				if (userObj_in_body.notification) {
					this.notifications = userObj_in_body.notification;
				}
			});
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['login']);
	}

	//prefer active unsubscribing from all the hotpatch data from firebase
	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
