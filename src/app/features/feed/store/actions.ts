import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  Feed,
  FeedResponse,
  SingleArticleResponse,
  TagsResponse,
} from '../interfaces/feed.interface';

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    feed: emptyProps(),
    'feed success': props<{ response: FeedResponse }>(),
    'feed error': emptyProps(),
  },
});

export const tagsActions = createActionGroup({
  source: 'tags',
  events: {
    tags: emptyProps(),
    'tags success': props<{ response: TagsResponse }>(),
    'tags error': emptyProps(),
  },
});

export const articleActions = createActionGroup({
  source: 'article',
  events: {
    article: props<{ slug: string }>(),
    'article success': props<{ article: SingleArticleResponse }>(),
    'article error': emptyProps(),
  },
});

export const tagsFeedActions = createActionGroup({
  source: 'tagsFeed',
  events: {
    'tags feed': props<{ tag: string }>(),
    'tags feed success': props<{ response: FeedResponse }>(),
  },
});

export const userFeedActions = createActionGroup({
  source: 'user feed',
  events: {
    'user feed start': emptyProps(),
    'user feed success': props<{ response: FeedResponse }>(),
  },
});

export const articleComments = createActionGroup({
  source: 'comments',
  events: {
    'comments start': props<{ slug: string }>(),
    'comments success': props<{ comments: any }>(),
  },
});
