import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './layout/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<app-main />',
  imports: [CommonModule, RouterOutlet, MainComponent],
})
export class AppComponent {
  title = 'new-ngrx';
}
