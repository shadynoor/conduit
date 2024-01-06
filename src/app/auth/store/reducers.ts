import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../inetrfaces/auth.interface';
import {
  checkuserLoggedActions,
  loginActions,
  registerActions,
} from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

export const authInitialState: AuthState = {
  isSubmit: false,
  isLoadingUser: false,
  currentUser: undefined,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(routerNavigationAction, (state) => ({
      ...state,
      validationErrors: null,
    })),
    on(registerActions.register, (state) => {
      return { ...state, isSubmit: true };
    }),
    on(registerActions.registerSuccess, (state, actions) => {
      return {
        ...state,
        isSubmit: false,
        currentUser: actions.user,
      };
    }),
    on(registerActions.registerFail, (state, actions) => {
      const msg = Object.keys(actions.errors).map((name) => {
        const messages = actions.errors[name].join(' ');
        return `${name} ${messages}`;
      });
      return {
        ...state,
        isSubmit: false,
        validationErrors: msg[0],
      };
    }),
    // login actions
    on(loginActions.login, (state) => {
      return { ...state, isSubmit: true };
    }),
    on(loginActions.loginSuccess, (state, actions) => {
      return {
        ...state,
        isSubmit: false,
        currentUser: actions.user,
      };
    }),
    on(loginActions.loginFail, (state, actions) => {
      const msg = Object.keys(actions.errors).map((name) => {
        const messages = actions.errors[name].join(' ');
        return `${name} ${messages}`;
      });
      return {
        ...state,
        isSubmit: false,
        validationErrors: msg[0],
      };
    }),
    // check user logged in or not
    on(checkuserLoggedActions.checkLogged, (state) => {
      return { ...state, isLoading: true };
    }),
    on(checkuserLoggedActions.checkLoggedSuccess, (state, actions) => {
      return { ...state, isLoading: false, currentUser: actions.user };
    }),
    on(checkuserLoggedActions.checkLogged, (state) => {
      return { ...state, isLoading: false, currentUser: null };
    })
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectCurrentUser,
  selectIsLoadingUser,
  selectIsSubmit,
  selectValidationErrors,
} = authFeature;
