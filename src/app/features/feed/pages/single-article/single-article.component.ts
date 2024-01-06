import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { articleActions, articleComments } from '../../store/actions';
import { combineLatest } from 'rxjs';
import {
  selectCommentsState,
  selectSingleArticle,
  selectSingleArticleLoading,
} from '../../store/reducer';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FeedService } from '../../services/feed.service';
import { PlatformService } from '../../../../core/services/platform.service';

@Component({
  selector: 'app-single-article',
  standalone: true,
  templateUrl: './single-article.component.html',
  styleUrl: './single-article.component.scss',
  imports: [
    CommonModule,
    SpinnerComponent,
    RouterLink,
    RouterModule,
    FormsModule,
  ],
})
export class SingleArticleComponent implements OnInit {
  @Input() slug: string = '';

  constructor(private store: Store) {}

  article$ = this.store.select(selectSingleArticle);
  isLoading = this.store.select(selectSingleArticleLoading);

  commentsState$ = this.store.select(selectCommentsState);

  private feedService = inject(FeedService);
  private platform = inject(PlatformService);

  isUser = false;

  ngOnInit(): void {
    this.store.dispatch(articleActions.article({ slug: this.slug }));
    this.store.dispatch(articleComments.commentsStart({ slug: this.slug }));
    if (this.platform.isBrowser) {
      if (localStorage['user']) {
        this.isUser = true;
      }
    }
  }

  addComment(form: NgForm) {
    const comment = {
      body: form.value.comment,
    };

    this.feedService.addComment(this.slug, comment).subscribe((res) => {
      console.log(res);
    });
  }
}
