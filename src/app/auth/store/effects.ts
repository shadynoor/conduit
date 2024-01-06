import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import {
  checkuserLoggedActions,
  loginActions,
  registerActions,
} from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { PlatformService } from '../../core/services/platform.service';

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    service = inject(AuthService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(loginActions.login),
      switchMap(({ request }) => {
        return service.login(request).pipe(
          map((user) => {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
            router.navigateByUrl('/');
            return loginActions.loginSuccess({ user });
          }),
          catchError((err) => {
            return of(loginActions.loginFail({ errors: err.error.errors }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    service = inject(AuthService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(registerActions.register),
      switchMap(({ request }) => {
        return service.register(request).pipe(
          map((user) => {
            router.navigateByUrl('/login');
            return registerActions.registerSuccess({ user });
          }),
          catchError((errors) => {
            return of(
              registerActions.registerFail({ errors: errors.error.errors })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const checkLoggedEffect = createEffect(
  (
    actions$ = inject(Actions),
    service = inject(AuthService),
    platform = inject(PlatformService)
  ) => {
    return actions$.pipe(
      ofType(checkuserLoggedActions.checkLogged),
      switchMap(() => {
        return service.getCurrentUser().pipe(
          map((user) => {
            return checkuserLoggedActions.checkLoggedSuccess({ user });
          }),
          catchError(() => {
            if (platform.isBrowser) {
              localStorage.removeItem('user');
              localStorage.removeItem('Token');
            }
            return of(checkuserLoggedActions.checkLoggedFail());
          })
        );
      })
    );
  },
  { functional: true }
);
