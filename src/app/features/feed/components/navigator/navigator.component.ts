import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Params,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../../auth/store/reducers';
import {
  feedActions,
  tagsFeedActions,
  userFeedActions,
} from '../../store/actions';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.scss',
})
export class NavigatorComponent implements OnInit, OnDestroy {
  isUser$ = this.store.select(selectCurrentUser);
  route = inject(ActivatedRoute);
  isPage = false;
  @Output() userFeed = new EventEmitter<boolean>();

  constructor(private store: Store, public feedService: FeedService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      if (res['page'] == 'your-feed' || res['tag']) {
        this.isPage = false;
      } else {
        this.isPage = true;
      }

      // if (res['tag']) {
      //   this.isPage = false;
      // } else {
      //   this.isPage = true;
      // }
    });
  }

  goToGlobal() {
    this.feedService.offset = 0;
    this.store.dispatch(feedActions.feed());
    this.feedService.currentTag = '';
    this.feedService.userFeedPage = false;
    this.userFeed.emit(false);
  }

  goToYourFeed() {
    this.feedService.offset = 0;
    this.feedService.currentTag = '';
    this.feedService.userFeedPage = true;
    this.userFeed.emit(true);
  }

  ngOnDestroy(): void {
    this.feedService.currentTag = '';
    this.userFeed.emit(false);
  }
}
