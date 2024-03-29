//service to fetch some common details from server to once login/anonymous login is complete

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class CommonService {
	public header$: BehaviorSubject<any>;
	public body$: BehaviorSubject<any>;
	constructor(
		private afs: AngularFirestore, // Inject Firestore service
		private auth: AuthService
	) {
		this.header$ = new BehaviorSubject<any>({});
		this.body$ = new BehaviorSubject<any>({});

		//refresh data everytime the user status changes
		this.auth.user$.subscribe({
			next: (ur) => {
				if (ur) {
					this.initBasicInfo();
				}
			},
		});

		console.log('CommonService Constructor completed');
	}

	initBasicInfo = () => {
		let self = this;
		this.afs
			.doc<any>(`common/basic-info`)
			.get()
			.subscribe({
				next: (val) => {
					self.header$.next(val.data().header);
					self.body$.next(val.data().body);
				},
				complete: () => {
					console.log('Done looking for common data');
				},
			});
	};
}
