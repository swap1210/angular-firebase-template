import { UserInfo } from '@angular/fire/auth';

export interface UserInterface {
  email: string;
  displayName: string;
}

export enum TM_Role {
  SUPPORT = 'support-user',
  SERVICE = 'service-user',
  CLIENT = 'client-user',
}

export function getRoleFromString(roleStr: string): TM_Role | undefined {
  return Object.values(TM_Role).find((role) => role === roleStr);
}

export interface ProfileDocumentInterface {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  language: string;
  roles: TM_Role[];
}
