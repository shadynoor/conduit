import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { environment } from '../../../../environments/environment';
import { setHeaders } from '../../../core/helpers/user-header';
import { FeedResponse } from '../../feed/interfaces/feed.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  getProfile(username: string): Observable<Profile> {
    return this.http.get<Profile>(
      environment.apiLink + `profiles/${username}`,
      {
        headers: setHeaders(),
      }
    );
  }

  followProfile(username: string): Observable<Profile> {
    return this.http.post<Profile>(
      environment.apiLink + `profiles/${username}/follow`,
      '',
      {
        headers: setHeaders(),
      }
    );
  }

  unfollowProfile(username: string): Observable<Profile> {
    return this.http.delete<Profile>(
      environment.apiLink + `profiles/${username}/follow`,
      {
        headers: setHeaders(),
      }
    );
  }

  getFeedsByUser(username: string) {
    return this.http.get<FeedResponse>(
      environment.apiLink + `articles?author=${username}`
    );
  }

  updateProfile(user: any) {
    return this.http.put(
      environment.apiLink + `user`,
      { user },
      {
        headers: setHeaders(),
      }
    );
  }
}
