import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PlatformService } from '../../core/services/platform.service';
import { Store } from '@ngrx/store';
import { checkuserLoggedActions } from '../../auth/store/actions';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [CommonModule, RouterOutlet, NavbarComponent],
})
export class MainComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(checkuserLoggedActions.checkLogged());
  }
}
