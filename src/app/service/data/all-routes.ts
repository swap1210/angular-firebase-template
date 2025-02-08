export const ROOT_ROUTE = '/';
export const HOME_ROUTE = 'home';
export const REGISTER_ROUTE = 'register';
export const LOGIN_ROUTE = 'login';
export const SECURE_HOME_ROUTE = 'secure-home';
export const SUPPORT_USER_ROUTE = 'support-user';
export const SERVICE_USER_ROUTE = 'service-user';
export const CLIENT_USER_ROUTE = 'client-user';

export interface TM_Route {
  key: string;
  title: string;
  path: string;
  icon?: string;
  subroutes: TM_Route[];
}

export const ALL_ROUTES: TM_Route[] = [
  {
    title: 'Home',
    path: HOME_ROUTE,
    subroutes: [],
    key: HOME_ROUTE,
  },
  {
    title: 'Register',
    path: REGISTER_ROUTE,
    subroutes: [],
    key: REGISTER_ROUTE,
  },
  {
    title: 'Login',
    path: LOGIN_ROUTE,
    subroutes: [],
    key: LOGIN_ROUTE,
  },
  {
    title: 'Secure Home',
    path: SECURE_HOME_ROUTE,
    subroutes: [],
    key: SECURE_HOME_ROUTE,
  },
  {
    title: 'Support User Home',
    path: SUPPORT_USER_ROUTE,
    icon: 'support_agent',
    subroutes: [],
    key: SUPPORT_USER_ROUTE,
  },
  {
    title: 'Service User Home',
    path: SERVICE_USER_ROUTE,
    icon: 'room_service',
    subroutes: [],
    key: SERVICE_USER_ROUTE,
  },
  {
    title: 'Client User Home',
    path: CLIENT_USER_ROUTE,
    icon: 'face',
    subroutes: [],
    key: CLIENT_USER_ROUTE,
  },
];

export const getRouteObjFromPath = (path: string): TM_Route | null => {
  return ALL_ROUTES.find((route) => route.path === path) || null;
};
