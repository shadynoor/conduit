import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  checkLoggedEffect,
  loginEffect,
  registerEffect,
} from './auth/store/effects';
import { provideRouterStore } from '@ngrx/router-store';
import {
  commentsFeatureKey,
  commentsReducer,
  feedFeatureKey,
  feedReducer,
  filterTagsFeatureKey,
  filterTagsReducer,
  singleArticleFeatureKey,
  singleArticleReducer,
  tagsFeatureKey,
  tagsReducer,
  userFeedFeatureKey,
  userFeedReducer,
} from './features/feed/store/reducer';
import {
  articleCommentsEffect,
  feedEffect,
  singleArticleEffect,
  singleTagArticles,
  tagsEffect,
  userFeedEffect,
} from './features/feed/store/effects';
import {
  followFeatureKey,
  followReducer,
  profileFeatureKey,
  profileReducer,
  userPostsFeaturekey,
  userPostsReducer,
} from './features/profile-page/store/reducer';
import {
  followEffect,
  profileEffect,
  userPostsEffect,
} from './features/profile-page/store/effects';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    // store
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(tagsFeatureKey, tagsReducer),
    provideState(singleArticleFeatureKey, singleArticleReducer),
    provideState(filterTagsFeatureKey, filterTagsReducer),
    provideState(profileFeatureKey, profileReducer),
    provideState(followFeatureKey, followReducer),
    provideState(userFeedFeatureKey, userFeedReducer),
    provideState(userPostsFeaturekey, userPostsReducer),
    provideState(commentsFeatureKey, commentsReducer),
    provideEffects({ loginEffect }, { registerEffect }, { checkLoggedEffect }, { feedEffect }, { tagsEffect }, { singleArticleEffect }, { singleTagArticles }, { profileEffect }, { followEffect }, { userFeedEffect }, { userPostsEffect }, { articleCommentsEffect }),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
    }),
    provideRouterStore(),
    provideAnimations()
],
};
