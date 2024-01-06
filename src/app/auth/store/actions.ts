import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  CurrentUser,
  RegisterRequest,
  loginRequest,
} from '../inetrfaces/auth.interface';

export const registerActions = createActionGroup({
  source: 'auth',
  events: {
    register: props<{ request: RegisterRequest }>(),
    'register success': props<{ user: CurrentUser }>(),
    'register fail': props<{ errors: any }>(),
  },
});

export const loginActions = createActionGroup({
  source: 'auth',
  events: {
    login: props<{ request: loginRequest }>(),
    'login success': props<{ user: CurrentUser }>(),
    'login fail': props<{ errors: any }>(),
  },
});

export const checkuserLoggedActions = createActionGroup({
  source: 'auth',
  events: {
    checkLogged: emptyProps(),
    'checkLogged success': props<{ user: CurrentUser }>(),
    'checkLogged fail': emptyProps(),
  },
});
