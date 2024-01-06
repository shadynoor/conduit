import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Profile } from '../interfaces/profile.interface';
import { FeedResponse } from '../../feed/interfaces/feed.interface';

export const profileAction = createActionGroup({
  source: 'profile',
  events: {
    'profile start': props<{ username: string }>(),
    'profile success': props<{ profile: Profile }>(),
    'profile error': emptyProps(),
  },
});

export const followActions = createActionGroup({
  source: 'follow',
  events: {
    'follow start': props<{ username: string; following: boolean }>(),
    'follow success': props<{ profile: Profile }>(),
    // 'follow delete': props<{profile:Profile}>(),
  },
});

export const userPostsActions = createActionGroup({
  source: 'user posts',
  events: {
    'user posts start': props<{ username: string }>(),
    'user posts success': props<{ posts: FeedResponse }>(),
  },
});
