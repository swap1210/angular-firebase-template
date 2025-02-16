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

export interface InputProfileDocumentInterface {
  first_name: string;
  last_name: string;
  language: string;
}

export interface ProfileDocumentInterface
  extends InputProfileDocumentInterface {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  roles: TM_Role[];
}
