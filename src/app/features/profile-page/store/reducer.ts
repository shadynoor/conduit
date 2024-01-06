import { createFeature, createReducer, on } from '@ngrx/store';
import { ProfileInitialData } from '../interfaces/profile.interface';
import { followActions, profileAction, userPostsActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';
import { FeedStateInterface } from '../../feed/interfaces/feed.interface';

export const profileInitialState: ProfileInitialData = {
  profile: null,
  profileLoading: false,
};

export const followingState: any = {
  followProfile: null,
};

export const initialState: FeedStateInterface = {
  feed: null,
  loadingData: false,
  error: null,
};

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    profileInitialState,
    on(routerNavigationAction, (state) => ({
      ...state,
      profile: null,
    })),
    on(profileAction.profileStart, (state) => {
      return { ...state, profileLoading: true };
    }),
    on(profileAction.profileSuccess, (state, action) => {
      return { ...state, profile: action.profile, profileLoading: false };
    })
  ),
});

export const followFeature = createFeature({
  name: 'follow',
  reducer: createReducer(
    followingState,
    on(routerNavigationAction, (state) => ({
      ...state,
      followProfile: null,
    })),
    on(followActions.followStart, (state) => {
      return { ...state };
    }),
    on(followActions.followSuccess, (state, action) => {
      return { ...state, followProfile: action.profile };
    })
  ),
});

export const userPostsFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    initialState,
    on(routerNavigationAction, (state) => ({
      ...state,
      feed: null,
    })),
    on(userPostsActions.userPostsStart, (state) => {
      return { ...state, loadingData: true };
    }),
    on(userPostsActions.userPostsSuccess, (state, action) => {
      return { ...state, feed: action.posts, loadingData: false };
    })
  ),
});

export const {
  name: profileFeatureKey,
  reducer: profileReducer,
  selectProfile,
  selectProfileLoading,
} = profileFeature;

export const {
  name: followFeatureKey,
  reducer: followReducer,
  selectFollowState,
} = followFeature;

export const {
  name: userPostsFeaturekey,
  reducer: userPostsReducer,
  selectFeed,
  selectLoadingData,
} = userPostsFeature;
