import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { FeedComponent } from '../../components/feed/feed.component';
import { FeedService } from '../../services/feed.service';
import { Store } from '@ngrx/store';
import {
  feedActions,
  tagsActions,
  tagsFeedActions,
  userFeedActions,
} from '../../store/actions';
import { Subscription, combineLatest } from 'rxjs';
import {
  selectFeed,
  selectLoadingData,
  selectTags,
  selectTagsFeedState,
  selectUserFeedState,
} from '../../store/reducer';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import {
  ActivatedRoute,
  Params,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { PlatformService } from '../../../../core/services/platform.service';

@Component({
  selector: 'app-feed-page',
  standalone: true,
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.scss',
  imports: [
    CommonModule,
    NavigatorComponent,
    FeedComponent,
    SpinnerComponent,
    RouterLink,
    RouterLinkActive,
    NgxSkeletonLoaderModule,
    PaginationComponent,
  ],
})
export class FeedPageComponent implements OnInit {
  feedService = inject(FeedService);
  store = inject(Store);
  route = inject(ActivatedRoute);
  platform = inject(PlatformService);
  feeds!: any;
  allSelectors$ = combineLatest({
    data: this.store.select(selectFeed),
    loading: this.store.select(selectLoadingData),
    tagsFeed: this.store.select(selectTagsFeedState),
  });

  // initial feed props
  feed = this.store.select(selectFeed);
  feedLoading = this.store.select(selectLoadingData);
  feedLength: any;

  // tagsFeed State
  tagsFeed = this.store.select(selectTagsFeedState);
  tagsLoading = false;
  tags$ = this.store.select(selectTags);

  // pagination
  initialPage = 1;

  userFeedLoading = false;
  userFeedPage = false;

  routeSub$!: Subscription;

  ngOnInit(): void {
    // get tags
    this.store.dispatch(tagsActions.tags());

    // check if the route has a page or not
    if (this.route.snapshot.params['id']) {
      if (this.platform.isBrowser) {
        this.routeSub$ = this.route.params.subscribe((params: Params) => {
          this.changePage(+params['id'] - 1);
        });
      }
    } else {
      this.store.dispatch(feedActions.feed());
    }

    // check qParams for tags
    this.route.queryParams.subscribe((qParams) => {
      if (qParams['tag']) {
        this.updateFeedTags(qParams['tag']);
      } else if (qParams['page']) {
        this.userFeedPage = true;
        this.openUserFeed(true);
      } else {
        this.store.select(selectFeed).subscribe((res) => {
          // redirect to home again
          if (res?.articles.length == 0) {
            console.log('redirect');
          }
          this.feeds = res?.articles;
          this.feedLength = Math.ceil(res?.articlesCount! / 10);
          this.userFeedLoading = false;
        });
      }
    });
  }

  openTagFromPost(tag: string) {
    this.updateFeedTags(tag);
  }

  updateFeedTags(tag: string) {
    this.feedService.currentTag = tag;
    this.store.dispatch(tagsFeedActions.tagsFeed({ tag: tag }));
    this.feedService.offset = 0;
    this.tagsFeed.subscribe((res) => {
      this.feeds = res.tagsFeedData;
      this.tagsLoading = res.tagsLoading;
      this.feedLength = Math.ceil(res.tagsFeedLength / 10);
    });
  }

  changePage(number: number) {
    // set offset based on page number
    if (number > 0) {
      this.feedService.offset = 10 * number;
    } else {
      this.feedService.offset = 0;
    }

    // this.initialPage = number;
    // this.feedService.offset = 10 * number;

    this.route.queryParams.subscribe((res) => {
      if (res['tag']) {
        this.store.dispatch(tagsFeedActions.tagsFeed({ tag: res['tag'] }));
      } else if (res['page']) {
        // this.store.dispatch(userFeedActions.userFeedStart());
        this.openUserFeed(true);
      } else {
        this.store.dispatch(feedActions.feed());
      }
    });
    window.scrollTo({
      top: 0,
    });
  }

  openUserFeed(event: boolean) {
    if (event) {
      this.store.dispatch(userFeedActions.userFeedStart());
      this.store.select(selectUserFeedState).subscribe((res) => {
        this.feeds = res.userFeedData;
        // userFeedLength: 0,\
        this.feedLength = Math.ceil(res.userFeedLength / 10);
        this.userFeedLoading = res.userFeedLoading;
      });
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.routeSub$) this.routeSub$.unsubscribe();
  }
}
