import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../../features/feed/services/feed.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() paginationLength: number = 0;
  @Output() selectedPage = new EventEmitter<number>();
  feedService = inject(FeedService);
  @Input() initialPage = 1;
  currentPage = 1;
  isDisabled = false;

  route = inject(ActivatedRoute);

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.currentPage = +this.route.snapshot.params['id'] - 1;
    }
  }

  goToPage(type: string) {
    if (type == 'next') {
      this.currentPage++;
      this.selectedPage.emit(this.currentPage);
    } else {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
      this.selectedPage.emit(this.currentPage);
    }
    // if (number > 0) {
    //   this.feedService.offset = 10 * number;
    // } else {
    //   this.feedService.offset = 0;
    // }
    // this.route.queryParams.subscribe((res) => {
    //   if (res['tag']) {
    //     this.store.dispatch(tagsFeedActions.tagsFeed({ tag: res['tag'] }));
    //   } else {
    //     this.store.dispatch(feedActions.feed());
    //   }
    // });
    // window.scrollTo({
    //   top: 0,
    // });
  }

  // next() {
  //   if (this.paginationLength > this.initialPage) {
  //     this.initialPage++;
  //     this.currentPage = this.initialPage + 1;
  //     this.goToPage(this.initialPage);
  //   }
  // }

  // previous() {
  //   if (this.initialPage > 0) {
  //     this.initialPage--;
  //     this.currentPage = this.initialPage;
  //     this.goToPage(this.initialPage);
  //   } else {
  //     this.currentPage = this.initialPage + 1;
  //     return;
  //   }
  // }

  // next() {
  //   this.feedService.offset = this.feedService.offset + 10;
  //   this.store.dispatch(feedActions.feed());
  //   this.allSelectors$.subscribe((res) => {
  //     if (res.loading == true) {
  //       window.scrollTo({
  //         top: 0,
  //       });
  //     }
  //   });
  // }

  // prev() {
  //   if (this.feedService.offset >= 10) {
  //     this.feedService.offset = this.feedService.offset - 10;
  //     this.store.dispatch(feedActions.feed());
  //     this.allSelectors$.subscribe((res) => {
  //       if (res.loading == true) {
  //         window.scrollTo({
  //           top: 0,
  //         });
  //       }
  //     });
  //   }
  // }
}
