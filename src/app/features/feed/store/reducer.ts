import { createFeature, createReducer, on } from '@ngrx/store';
import {
  Feed,
  FeedStateInterface,
  SingleArticleResponse,
  SingleArticleState,
  TagsStateInterface,
} from '../interfaces/feed.interface';
import {
  articleActions,
  articleComments,
  feedActions,
  tagsActions,
  tagsFeedActions,
  userFeedActions,
} from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

export const initialState: FeedStateInterface = {
  feed: null,
  loadingData: true,
  error: null,
};

export const initialStateTags: TagsStateInterface = {
  tags: null,
  isLoading: false,
  error: '',
};

export const initialFeed: SingleArticleState = {
  singleArticle: null,
  singleArticleLoading: false,
  error: '',
};

export const tagsFeedInitial: any = {
  tagsFeedData: [],
  tagsLoading: false,
  tagsFeedLength: 0,
};
export const userFeedInitial: any = {
  userFeedData: [],
  userFeedLength: 0,
  userFeedLoading: false,
};

export const commentsInitial: any = {};

// export const UserFeedInitialState: FeedStateInterface = {
//   feed: null,
//   loadingData: true,
//   error: null,
// };

export const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.feed, (state) => {
      return { ...state, loadingData: false };
    }),
    on(feedActions.feedSuccess, (state, actions) => {
      return { ...state, loadingData: true, feed: actions.response };
    }),
    on(feedActions.feed, (state) => {
      return { ...state, loadingData: false, error: 'Error' };
    })
  ),
});

export const tagsFeature = createFeature({
  name: 'tags',
  reducer: createReducer(
    initialStateTags,
    on(tagsActions.tags, (state) => {
      return { ...state };
    }),
    on(tagsActions.tagsSuccess, (state, actions) => {
      return { ...state, tags: actions.response };
    }),
    on(tagsActions.tagsError, (state) => {
      return { ...state, error: 'Error' };
    })
  ),
});

export const singleArticleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialFeed,
    on(articleActions.article, (state, action) => {
      return { ...state, singleArticleLoading: true };
    }),
    on(articleActions.articleSuccess, (state, action) => {
      return {
        ...state,
        singleArticleLoading: false,
        singleArticle: action.article.article,
      };
    }),
    on(articleActions.articleError, (state, action) => {
      return { ...state, singleArticleLoading: false };
    })
  ),
});

// export const filterTags = createFeature({
//   name: 'tags feed',
//   reducer: filterTagsReducer(
//     tagsFeedInitial,
//     on(tagsFeedActions.tagsFeed, (state) => {
//       return { ...state };
//     })
//   ),
// });

// export const filterTagsFeature = createFeature({
//   name: 'tagsFeed',
//   reducer: tagsFeedReducer(
//     tagsFeedInitial,
//     on(tagsFeedActions.tagsFeed, (state) => {
//       return { ...state };
//     })
//   ),
// });

export const filterTagsFeature = createFeature({
  name: 'tagsFeed',
  reducer: createReducer(
    tagsFeedInitial,
    on(routerNavigationAction, (state) => ({
      ...state,
      tagsFeedData: null,
      tagsFeedLength: 0,
    })),
    on(tagsFeedActions.tagsFeed, (state) => {
      return { ...state, tagsLoading: true };
    }),
    on(tagsFeedActions.tagsFeedSuccess, (state, action) => {
      return {
        ...state,
        tagsFeedData: action.response.articles,
        tagsLoading: false,
        tagsFeedLength: action.response.articlesCount,
      };
    })
  ),
});

// user following feed

export const userFeedFeature = createFeature({
  name: 'userFeed',
  reducer: createReducer(
    userFeedInitial,
    on(userFeedActions.userFeedStart, (state) => {
      return { ...state, userFeedLoading: true };
    }),
    on(userFeedActions.userFeedSuccess, (state, actions) => {
      return {
        ...state,
        userFeedData: actions.response.articles,
        userFeedLength: actions.response.articlesCount,
        userFeedLoading: false,
      };
    })
  ),
});

export const commentsFeature = createFeature({
  name: 'comments',
  reducer: createReducer(
    commentsInitial,
    on(articleComments.commentsStart, (state) => {}),

    on(articleComments.commentsSuccess, (state, action) => {
      return { ...state, comments: action.comments.comments };
    })
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectFeed,
  selectError,
  selectLoadingData,
} = feedFeature;

export const {
  name: tagsFeatureKey,
  reducer: tagsReducer,
  selectTags,
} = tagsFeature;

export const {
  name: singleArticleFeatureKey,
  reducer: singleArticleReducer,
  selectSingleArticle,
  selectSingleArticleLoading,
} = singleArticleFeature;

export const {
  name: filterTagsFeatureKey,
  reducer: filterTagsReducer,
  selectTagsFeedState,
} = filterTagsFeature;

export const {
  name: userFeedFeatureKey,
  reducer: userFeedReducer,
  selectUserFeedState,
} = userFeedFeature;

export const {
  name: commentsFeatureKey,
  reducer: commentsReducer,
  selectCommentsState,
} = commentsFeature;
