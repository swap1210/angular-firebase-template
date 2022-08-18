//service to fetch some common details from server to once login/anonymous login is complete

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
	public header$: BehaviorSubject<any>;
	public body$: BehaviorSubject<any>;
	constructor(
		private afs: AngularFirestore // Inject Firestore service
	) {
		this.header$ = new BehaviorSubject<any>({});
		this.body$ = new BehaviorSubject<any>({});
		this.initBasicInfo();
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
			});
	};
}
