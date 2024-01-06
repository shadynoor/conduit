import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducers';
import {
  followActions,
  profileAction,
  userPostsActions,
} from '../store/actions';
import {
  selectFeed,
  selectFollowState,
  selectLoadingData,
  selectProfile,
  selectProfileLoading,
} from '../store/reducer';
import { ActivatedRoute, Params } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CurrentUser } from '../../../auth/inetrfaces/auth.interface';
import { Profile } from '../interfaces/profile.interface';
import { PlatformService } from '../../../core/services/platform.service';
import { ProfileService } from '../services/profile.service';
import { FeedComponent } from '../../feed/components/feed/feed.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from '../components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [
    CommonModule,
    SpinnerComponent,
    FeedComponent,
    NgxSkeletonLoaderModule,
    MatDialogModule,
  ],
})
export class ProfileComponent implements OnInit {
  store = inject(Store);
  route = inject(ActivatedRoute);
  platform = inject(PlatformService);
  profileService = inject(ProfileService);
  currentUser$ = this.store.select(selectCurrentUser);
  currentProfile = false;
  profile$ = this.store.select(selectProfile);
  loading$ = this.store.select(selectProfileLoading);

  dialog = inject(MatDialog);

  profile: any;

  // posts
  postsLoading$ = this.store.select(selectLoadingData);
  userPosts: any;
  ngOnInit(): void {
    this.getCurrentProfile();
  }

  getCurrentProfile() {
    this.route.params.subscribe((params: Params) => {
      if (this.platform.isBrowser) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (params['username'] == 'me') {
          this.currentProfile = true;
          this.profile = user;

          this.store.dispatch(
            userPostsActions.userPostsStart({
              username: user.username!,
            })
          );

          // get user posts
          this.store.select(selectFeed).subscribe((res) => {
            this.userPosts = res?.articles;
          });
        } else {
          this.currentProfile = false;
          this.store.dispatch(
            profileAction.profileStart({ username: params['username'] })
          );
          this.profile$.subscribe((profile) => {
            this.profile = profile?.profile;
            this.store.dispatch(
              userPostsActions.userPostsStart({
                username: profile?.profile.username!,
              })
            );
            // this.profileService
            //   .getFeedsByUser(profile?.profile.username!)
            //   .subscribe((res) => {
            //     console.log(res);
            //   });
          });
        }
      }
    });

    // get user posts
    this.store.select(selectFeed).subscribe((res) => {
      this.userPosts = res?.articles;
    });
  }

  followUser(profile: any) {
    this.store.dispatch(
      followActions.followStart({
        username: profile.username,
        following: profile.following,
      })
    );

    this.store.select(selectFollowState).subscribe((res) => {
      if (res?.followProfile?.profile!) {
        this.profile = res?.followProfile?.profile;
      }
    });
  }

  editProfile(profile: any) {
    this.dialog.open(EditDialogComponent, {
      width: '50%',
      data: profile,
    });
  }
}
