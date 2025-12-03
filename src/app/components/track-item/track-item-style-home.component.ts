import { Component, Input, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MusicService } from "../../services/music.service";
import { TrackService } from "../../services/track.service";
import { Track1 } from "../../models/track.model";
import { Track } from "../../interfaces/app.interfaces";
import { IconPlayComponent } from "../icons/icon-play.component";
import { IconPauseComponent } from "../icons/icon-pause.component";
import { IconHeartComponent } from "../icons/icon-heart.component";
import { IconMoreVerticalComponent } from "../icons/icons.components";
import { PlaylistService } from "../../services/playlist.service";
@Component({
  selector: "app-track-item",
  standalone: true,
  imports: [CommonModule, IonicModule, IconPlayComponent],
  template: `
    <div
      class="playlist-card animate-hover"
      [class.active]="isCurrentTrack()"
      (click)="playTrack()"
    >
      <div class="cover-wrapper">
        <img [src]="getimgUrl(track.info)" [alt]="track.title" class="cover" />
        <div class="play-overlay" *ngIf="!isCurrentTrack() || !isPlaying()">
          <app-icon-play [size]="20"></app-icon-play>
        </div>
        <div class="playing-indicator" *ngIf="isCurrentTrack() && isPlaying()">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
      <div class="name text-ellipsis-2">{{ track.title }}</div>
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

      .play-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.2s ease;
        color: var(--spotify-text);
      }

      .track-item:hover .play-overlay {
        opacity: 1;
      }

      .playing-indicator {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        background: rgba(0, 0, 0, 0.5);
      }

      .bar {
        width: 3px;
        height: 12px;
        background: var(--spotify-green);
        border-radius: 2px;
        animation: bounce 1s ease-in-out infinite;
      }

      .bar:nth-child(2) {
        animation-delay: 0.2s;
      }

      .bar:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes bounce {
        0%,
        100% {
          transform: scaleY(0.3);
        }
        50% {
          transform: scaleY(1);
        }
      }
    `,
  ],
})
export class TrackItemHomeComponent {
  @Input() track!: Track;
  @Input() parentPlaylistId: number = -1;
  isPlaying = this.musicService.isPlaying;
  currentTrack = this.musicService.currentTrack;

  isCurrentTrack = computed(() => {
    const current = this.currentTrack();
    return current?.url === this.track.url;
  });

  isFavorite = computed(() => this.musicService.isFavorite(""));

  constructor(
    private musicService: MusicService,
    private playlistService: PlaylistService,
    private trackService: TrackService
  ) {}

  async playTrack() {
    if (this.isCurrentTrack()) {
      this.musicService.togglePlay();
    } else {
      if (this.parentPlaylistId == -1) {
        this.musicService.setPlaylistQeue([]);
      } else {
        this.musicService.setPlaylistQeue(
          (await this.playlistService.getPlaylistById(this.parentPlaylistId))
            ?.queue ?? []
        );
      }
      this.musicService.playTrack(this.track);
    }
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    this.musicService.toggleFavorite("");
  }
  getimgUrl(info: string): string {
    return this.trackService.extractImageUrl(info);
  }
  formatDuration(info: string): string {
    return this.trackService.extractdurationString(info);
  }
}
