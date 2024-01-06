import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  Feed,
  FeedResponse,
  SingleArticleResponse,
  TagsResponse,
} from '../interfaces/feed.interface';
import { Observable } from 'rxjs';
import { setHeaders } from '../../../core/helpers/user-header';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  limit = 10;
  offset = 0;
  currentTag = '';
  http = inject(HttpClient);
  userFeedPage = false;

  getFeeds(): Observable<FeedResponse> {
    return this.http.get<FeedResponse>(
      environment.apiLink + `articles?limit=${this.limit}&offset=${this.offset}`
    );
  }

  getTags(): Observable<TagsResponse> {
    return this.http.get<TagsResponse>(environment.apiLink + 'tags');
  }

  filterFeedByTag(tag: string): Observable<FeedResponse> {
    return this.http.get<FeedResponse>(
      environment.apiLink +
        `articles?tag=${tag}&&?limit=${this.limit}&offset=${this.offset}`
    );
  }

  getSingleFeed(slug: string): Observable<SingleArticleResponse> {
    return this.http.get<SingleArticleResponse>(
      environment.apiLink + 'articles/' + slug
    );
  }

  getArticleComments(slug: string) {
    return this.http.get<SingleArticleResponse>(
      environment.apiLink + 'articles/' + slug + '/comments'
    );
  }

  getFollowedFeeds(): Observable<FeedResponse> {
    return this.http.get<FeedResponse>(
      environment.apiLink +
        `articles/feed?limit=${this.limit}&offset=${this.offset}`,
      {
        headers: setHeaders(),
      }
    );
  }

  addComment(slug: string, comment: any) {
    return this.http.post(
      environment.apiLink + `articles/${slug}/comments`,
      { comment },
      {
        headers: setHeaders(),
      }
    );
  }
}
