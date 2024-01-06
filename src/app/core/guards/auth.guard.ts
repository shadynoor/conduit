import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../services/platform.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platform = inject(PlatformService);
  let user;
  if (platform.isBrowser) {
    user = localStorage.getItem('user');
    if (user) {
      router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
