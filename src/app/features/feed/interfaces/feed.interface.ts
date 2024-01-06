export interface FeedStateInterface {
  loadingData: boolean;
  error: string | null;
  feed: FeedResponse | null;
}
export interface TagsStateInterface {
  isLoading: boolean;
  error: string | null;
  tags: TagsResponse | null;
}

export interface Feed {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface FeedResponse {
  articles: Feed[];
  articlesCount: number;
}

export interface Author {
  bio: string;
  following: boolean;
  image: string;
  username: string;
}

export interface TagsResponse {
  tags: string[];
}

export interface SingleArticleResponse {
  article: SingleArticle;
}

export interface SingleArticle {
  author?: Author;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt?: any;
}

export interface SingleArticleState {
  singleArticle: SingleArticle | null;
  singleArticleLoading: boolean;
  error: string;
}
