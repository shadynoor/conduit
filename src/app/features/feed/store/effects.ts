import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeedService } from '../services/feed.service';
import {
  articleActions,
  articleComments,
  feedActions,
  tagsActions,
  tagsFeedActions,
  userFeedActions,
} from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const feedEffect = createEffect(
  (actions$ = inject(Actions), service = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.feed),
      switchMap(() => {
        return service.getFeeds().pipe(
          map((response) => {
            return feedActions.feedSuccess({ response });
          }),
          catchError((error) => {
            return of(feedActions.feedError());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const tagsEffect = createEffect(
  (actions$ = inject(Actions), service = inject(FeedService)) => {
    return actions$.pipe(
      ofType(tagsActions.tags),
      switchMap(() => {
        return service.getTags().pipe(
          map((response) => {
            return tagsActions.tagsSuccess({ response });
          }),
          catchError((error) => {
            return of(tagsActions.tagsError());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const singleArticleEffect = createEffect(
  (service = inject(FeedService), actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(articleActions.article),
      switchMap(({ slug }) => {
        return service.getSingleFeed(slug).pipe(
          map((article) => {
            return articleActions.articleSuccess({ article });
          }),
          catchError((e) => {
            return of(articleActions.articleError());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const singleTagArticles = createEffect(
  (actions$ = inject(Actions), service = inject(FeedService)) => {
    return actions$.pipe(
      ofType(tagsFeedActions.tagsFeed),
      switchMap(({ tag }) => {
        return service.filterFeedByTag(tag).pipe(
          map((res) => {
            return tagsFeedActions.tagsFeedSuccess({ response: res });
          })
        );
      })
    );
  },
  { functional: true }
);

export const userFeedEffect = createEffect(
  (actions$ = inject(Actions), service = inject(FeedService)) => {
    return actions$.pipe(
      ofType(userFeedActions.userFeedStart),
      switchMap(() => {
        return service.getFollowedFeeds().pipe(
          map((response) => {
            return userFeedActions.userFeedSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const articleCommentsEffect = createEffect(
  (service = inject(FeedService), actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(articleComments.commentsStart),
      switchMap(({ slug }) => {
        return service.getArticleComments(slug).pipe(
          map((comments) => {
            return articleComments.commentsSuccess({ comments: comments });
          })
          // catchError((e) => {
          //   return of(articleActions.articleError());
          // })
        );
      })
    );
  },
  {
    functional: true,
  }
);
