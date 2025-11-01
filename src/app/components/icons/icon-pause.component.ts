import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-pause',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
    </svg>
  `
})
export class IconPauseComponent {
  @Input() size: number = 24;
}
