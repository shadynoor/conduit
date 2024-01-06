import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../services/profile.service';
import { followActions, profileAction, userPostsActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const profileEffect = createEffect(
  (actions$ = inject(Actions), service = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(profileAction.profileStart),
      switchMap(({ username }) => {
        return service.getProfile(username).pipe(
          map((profile) => {
            return profileAction.profileSuccess({ profile: profile });
          }),
          catchError(() => {
            return of(profileAction.profileError());
          })
        );
      })
    );
  },
  { functional: true }
);

export const followEffect = createEffect(
  (actions$ = inject(Actions), service = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(followActions.followStart),
      switchMap(({ username, following }) => {
        if (following) {
          return service.unfollowProfile(username).pipe(
            map((profile) => {
              return followActions.followSuccess({ profile });
            })
          );
        } else {
          return service.followProfile(username).pipe(
            map((profile) => {
              return followActions.followSuccess({ profile });
            })
          );
        }
      })
    );
  },
  {
    functional: true,
  }
);

export const userPostsEffect = createEffect(
  (actions$ = inject(Actions), service = inject(ProfileService)) => {
    return actions$.pipe(
      ofType(userPostsActions.userPostsStart),
      switchMap(({ username }) => {
        return service.getFeedsByUser(username).pipe(
          map((posts) => {
            return userPostsActions.userPostsSuccess({ posts });
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);
