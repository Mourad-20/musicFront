import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-play',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  `
})
export class IconPlayComponent {
  @Input() size: number = 24;
}
