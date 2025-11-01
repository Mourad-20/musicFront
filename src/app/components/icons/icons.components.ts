import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-next',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4l12 8-12 8V4zm12 0v16h2V4h-2z"/>
    </svg>
  `
})
export class IconNextComponent {
  @Input() size: number = 24;
}

@Component({
  selector: 'app-icon-previous',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 4v16l-12-8 12-8zM6 4v16H4V4h2z"/>
    </svg>
  `
})
export class IconPreviousComponent {
  @Input() size: number = 24;
}

@Component({
  selector: 'app-icon-shuffle',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
    </svg>
  `
})
export class IconShuffleComponent {
  @Input() size: number = 24;
}

@Component({
  selector: 'app-icon-repeat',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  `
})
export class IconRepeatComponent {
  @Input() size: number = 24;
}

@Component({
  selector: 'app-icon-search',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  `
})
export class IconSearchComponent {
  @Input() size: number = 24;
}

@Component({
  selector: 'app-icon-menu',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  `
})
export class IconMenuComponent {
  @Input() size: number = 24;
}

@Component({
  selector: 'app-icon-more-vertical',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="2"/>
      <circle cx="12" cy="12" r="2"/>
      <circle cx="12" cy="19" r="2"/>
    </svg>
  `
})
export class IconMoreVerticalComponent {
  @Input() size: number = 24;
}

@Component({
  selector: 'app-icon-download',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
    </svg>
  `
})
export class IconDownloadComponent {
  @Input() size: number = 24;
}

@Component({
  selector: 'app-icon-share',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  `
})
export class IconShareComponent {
  @Input() size: number = 24;
}

@Component({
  selector: 'app-icon-home',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
  `
})
export class IconHomeComponent {
  @Input() size: number = 24;
}

@Component({
  selector: 'app-icon-library',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  `
})
export class IconLibraryComponent {
  @Input() size: number = 24;
}
