import { Component, Input } from "@angular/core";

@Component({
  selector: "app-icon-music",
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      [style.color]="color"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 18 V5 L21 3 V16"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,
})
export class IconMusicComponent {
  @Input() size = 50;
  @Input() color = "var(--spotify-green)";
}
