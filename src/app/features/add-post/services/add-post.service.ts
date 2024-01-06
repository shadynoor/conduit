import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { setHeaders } from '../../../core/helpers/user-header';
import { AddArticleResponse, Article } from '../interfaces/article.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddPostService {
  http = inject(HttpClient);

  addArticle(article: Article): Observable<AddArticleResponse> {
    return this.http.post<AddArticleResponse>(
      environment.apiLink + 'articles/',
      { article },
      {
        headers: setHeaders(),
      }
    );
  }
}
