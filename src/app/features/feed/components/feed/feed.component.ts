import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feed } from '../../interfaces/feed.interface';
import { RouterLink, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxSkeletonLoaderModule, RouterModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {
  @Input() feed!: Feed;
  @Input() loading = false;
  @Output() tag = new EventEmitter<string>();

  openTag(tag: string) {
    this.tag.emit(tag);
  }
}
