import { Feed } from '../../feed/interfaces/feed.interface';

export interface Article {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export interface AddArticleResponse {
  article: Feed;
}
