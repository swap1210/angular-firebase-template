import { Type } from '@angular/core';
import { App_Role } from './user.interface';
import { TicketMasterComponent } from '../../secure-landing/support-user/ticket-master/ticket-master.component';
import { UserManagerComponent } from '../../secure-landing/support-user/user-manager/user-manager.component';

export const languagesMap: SelectFormFieldOption[] = [
  {
    value: 'en-US',
    viewValue: 'English (United States)',
  },
];

export const all_texts: AppStructure = {
  register: {
    title1: 'Create an account',
    description: 'Enter your details to create an account.',
    email_lbl: 'Email',
    email_plchldr: 'Enter Your email',
    password_lbl: 'Password',
    password_plchldr: 'Enter Your password',
    confirm_password: 'Confirm Your Password',
    or_hr: 'OR',
    signup_btn_lbl: 'Sign Up',
    alreadyRegistered: 'Already have an account?',
    loginHref: 'Log In',
    t_n_c_lbl: '',
    t_n_cHref: '',
  },
  login: {
    title1: 'Welcome back,👋',
    description: 'Glad to meet you again!, please login to use the app.',
    email_lbl: 'Email',
    email_plchldr: 'Enter Your email',
    password_lbl: 'Password',
    password_plchldr: 'Enter Your password',
    forget_password: 'Forgot password?',
    or_hr: 'OR',
    login_btn_lbl: 'Login in',
    notRegistered: 'Don’t have an account?',
    registerHref: 'Sign Up',
  },
  t_n_c: {
    t_n_c: '',
    effective_date_fmt: '',
    archive_version_href: '',
    download_pdf_href: '',
    topics: [
      {
        title1: '',
        title_sub: '',
        title2: '',
        descriptionHtml: '',
      },
      {
        title1: '',
        title_sub: '',
        title2: '',
        descriptionHtml: '',
      },
    ],
    title1: '',
    description: '',
  },
  profile: {
    title1: 'User Profile',
    description: '',
    first_name: {
      label: 'First Name',
      type: 'text',
    },
    last_name: {
      label: 'Last Name',
      type: 'text',
    },
    languages: {
      label: 'Select Language',
      defaultValue: 'en-US',
      options: languagesMap,
    },
    createProfileBtn: {
      label: 'Create Profile',
    },
    language: {
      type: 'text',
      label: 'Language',
    },
  },
  switchUserBottomSheet: {
    userRoles: [
      {
        icon: 'support_agent',
        key: App_Role.SUPPORT,
        label: 'Support Agent',
      },
      {
        icon: 'content_cut',
        key: App_Role.SERVICE,
        label: 'Service User',
      },
      {
        icon: 'face_6',
        key: App_Role.CLIENT,
        label: 'Client User',
      },
    ],
    title1: '',
    description: '',
  },
};

type Content = {
  title1: string;
  title2?: string;
  description: string;
};

type ContentHTML = {
  title1: string;
  title_sub?: string;
  title2?: string;
  descriptionHtml: string;
};

interface PageStructure extends Content {
  header_title?: string;
  welcomeImage?: string;
}

interface RegisterPageStructure extends PageStructure {
  email_lbl: string;
  email_plchldr: string;
  password_lbl: string;
  password_plchldr: string;
  confirm_password: string;
  or_hr: string;
  t_n_c_lbl: string;
  t_n_cHref: string;
  signup_btn_lbl: string;
  alreadyRegistered: string;
  loginHref: string;
}

interface TNCPageStructure extends PageStructure {
  t_n_c: string;
  effective_date_fmt: string;
  archive_version_href: string;
  download_pdf_href: string;
  country_version?: string;
  topics: ContentHTML[];
}

interface LoginPageStructure extends PageStructure {
  email_lbl: string;
  email_plchldr: string;
  password_lbl: string;
  password_plchldr: string;
  forget_password: string;
  or_hr: string;
  login_btn_lbl: string;
  notRegistered: string;
  registerHref: string;
}

type Button = {
  label: string;
};

interface IconLabelButton extends Button {
  icon: string;
  key: string;
}

type FormField = {
  label: string;
  aria_label?: string;
};

interface InputFormField extends FormField {
  placeholder?: string;
  defaultValue?: string;
  type: string;
}

interface SelectFormField extends FormField {
  defaultValue?: string;
  options: SelectFormFieldOption[];
}

interface SelectFormFieldOption {
  value: string;
  viewValue: string;
}

export interface ProfilePageStructure extends PageStructure {
  first_name: InputFormField;
  last_name: InputFormField;
  language: InputFormField; //added for view only screen
  languages: SelectFormField;
  createProfileBtn: Button;
}

export interface SwitchUserBottomSheetStructure extends PageStructure {
  userRoles: IconLabelButton[];
}

type AppStructure = {
  register: RegisterPageStructure;
  login: LoginPageStructure;
  profile: ProfilePageStructure;
  t_n_c: TNCPageStructure;
  switchUserBottomSheet: SwitchUserBottomSheetStructure;
};
