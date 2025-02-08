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

export function getTM_LoginTypeForSignedInUser(
  signedInUserProviderData: UserInfo[]
): TM_LoginType | undefined {
  let resultantLoginType: TM_LoginType | undefined = undefined;
  if (signedInUserProviderData.length > 0) {
    const provider = signedInUserProviderData[0]?.providerId;
    switch (provider) {
      case 'password':
        console.log('User signed in with Email/Password');
        resultantLoginType = TM_LoginType.EMAIL;
        break;
      case 'google.com':
        console.log('User signed in with Google');
        resultantLoginType = TM_LoginType.GOOGLE;
        break;
      default:
        console.log('User signed in with another provider:', provider);
    }
  }
  return resultantLoginType;
}

export enum TM_LoginType {
  EMAIL = 'email',
  GOOGLE = 'google',
}

export interface UserDocumentInterface {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  language: string;
  last_login: string;
  roles: TM_Role[];
  login_type: TM_LoginType | undefined;
}
