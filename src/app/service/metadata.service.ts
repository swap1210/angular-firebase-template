import { inject, Injectable, signal } from '@angular/core';
import {
  doc,
  Firestore,
  onSnapshot,
  Unsubscribe,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  firestore = inject(Firestore);
  metadataLevel1Signal = signal<any | null | undefined>(undefined);
  metadataLevel1Unsubscribe: any;

  constructor() {
    this.listenForLevel1Metadata();
  }

  listenForLevel1Metadata() {
    this.unsubscribeDocumentListener(this.metadataLevel1Unsubscribe);
    const metadataLevel1Ref = doc(this.firestore, `metadata/level1`);
    this.metadataLevel1Unsubscribe = onSnapshot(
      metadataLevel1Ref,
      (docSnap) => {
        if (docSnap.exists()) {
          this.metadataLevel1Signal.set(docSnap.data());
        } else {
          this.metadataLevel1Signal.set(null);
        }
      }
    );
  }

  private unsubscribeDocumentListener(
    userDocUnsubscribe: Unsubscribe | null
  ): void {
    if (userDocUnsubscribe) {
      userDocUnsubscribe(); // Call the unsubscribe function
      userDocUnsubscribe = null;
      console.log('Firestore listener unsubscribed.');
    }
  }
}
