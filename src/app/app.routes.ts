import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Error404Component } from './layout/404/404.component';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/components/register.component').then(
        (c) => c.RegisterComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login.component').then((c) => c.LoginComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'home/:id',
    loadComponent: () =>
      import('./features/feed/pages/feed-page/feed-page.component').then(
        (c) => c.FeedPageComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home/1',
    pathMatch: 'full',
  },
  {
    path: 'articles/new',
    loadComponent: () =>
      import('./features/add-post/add-post/add-post.component').then(
        (c) => c.AddPostComponent
      ),
  },
  {
    path: 'articles/:slug',
    loadComponent: () =>
      import(
        './features/feed/pages/single-article/single-article.component'
      ).then((c) => c.SingleArticleComponent),
  },
  {
    path: 'profile/:username',
    loadComponent: () =>
      import('./features/profile-page/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },

  {
    path: '**',
    component: Error404Component,
  },
];
