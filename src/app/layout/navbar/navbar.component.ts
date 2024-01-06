import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  selectCurrentUser,
  selectIsLoadingUser,
} from '../../auth/store/reducers';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { checkuserLoggedActions } from '../../auth/store/actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
    isLoading: this.store.select(selectIsLoadingUser),
  });
  constructor(private store: Store, private router: Router) {}

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.store.dispatch(checkuserLoggedActions.checkLogged());
    this.router.navigate(['/']);
  }
}
