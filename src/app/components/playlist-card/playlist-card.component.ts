import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { Playlist } from "../../models/track.model";
import { playlistObj } from "../../interfaces/app.interfaces";

@Component({
  selector: "app-playlist-card",
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div class="playlist-card animate-hover" (click)="openPlaylist()">
      <div class="cover-wrapper">
        <img
          src="https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300"
          [alt]="playlist.name"
          class="cover"
        />
      </div>
      <div class="name text-ellipsis-2">{{ playlist.name }}</div>
    </div>
  `,
  styles: [
    `
      .playlist-card {
        background: var(--spotify-gray);
        border-radius: 8px;
        padding: 16px;
        cursor: pointer;
        min-width: 160px;
        max-width: 200px;
      }

      .cover-wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        margin-bottom: 12px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      }

      .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .name {
        font-size: 14px;
        font-weight: 600;
        color: var(--spotify-text);
        margin-bottom: 4px;
        line-height: 1.3;
      }

      .description {
        font-size: 12px;
        color: var(--spotify-text-secondary);
        line-height: 1.4;
      }
    `,
  ],
})
export class PlaylistCardComponent {
  @Input() playlist!: playlistObj;

  constructor(private router: Router) {}

  openPlaylist(): void {
    this.router.navigate(["/playlist", this.playlist.id]);
  }
}
