import { Component, Input, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MusicService } from "../../services/music.service";
import { PlaylistService } from "../../services/playlist.service";
import { TrackService } from "../../services/track.service";
//import { Track } from '../../models/track.model';
import { Track } from "../../interfaces/app.interfaces";
import { IconPlayComponent } from "../icons/icon-play.component";
import { IconPauseComponent } from "../icons/icon-pause.component";
import { IconHeartComponent } from "../icons/icon-heart.component";
import { IconMoreVerticalComponent } from "../icons/icons.components";

@Component({
  selector: "app-track-item",
  standalone: true,
  imports: [CommonModule, IonicModule, IconPlayComponent, IconHeartComponent],
  template: `
    <div
      class="track-item"
      [class.active]="isCurrentTrack()"
      (click)="playTrack()"
    >
      <div class="left">
        <div class="cover-wrapper">
          <img
            [src]="getimgUrl(track.info)"
            [alt]="track.title"
            class="cover"
          />
          <div class="play-overlay" *ngIf="!isCurrentTrack() || !isPlaying()">
            <app-icon-play [size]="20"></app-icon-play>
          </div>
          <div
            class="playing-indicator"
            *ngIf="isCurrentTrack() && isPlaying()"
          >
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
        <div class="info">
          <div
            class="title text-ellipsis"
            [class.active-text]="isCurrentTrack()"
          >
            {{ track.title }}
          </div>
        </div>
      </div>

      <div class="right">
        <button class="heart-btn" (click)="toggleFavorite($event)">
          <app-icon-heart [size]="18" [filled]="isFavorite()"></app-icon-heart>
        </button>
        <span class="duration">{{ formatDuration(track.info) }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .track-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        cursor: pointer;
        transition: background 0.2s ease;
        border-radius: 4px;

        &:hover,
        &:active {
          background: var(--spotify-gray-light);
        }

        &.active {
          background: var(--spotify-gray-light);
        }
      }

      .left {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 0;
      }

      .cover-wrapper {
        position: relative;
        width: 48px;
        height: 48px;
        border-radius: 4px;
        overflow: hidden;
        flex-shrink: 0;
      }

      .cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
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

        .track-item:hover & {
          opacity: 1;
        }
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

        &:nth-child(2) {
          animation-delay: 0.2s;
        }

        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }

      @keyframes bounce {
        0%,
        100% {
          height: 8px;
        }
        50% {
          height: 16px;
        }
      }

      .info {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-size: 14px;
        font-weight: 500;
        color: var(--spotify-text);
        margin-bottom: 2px;

        &.active-text {
          color: var(--spotify-green);
        }
      }

      .artist {
        font-size: 12px;
        color: var(--spotify-text-secondary);
      }

      .right {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .heart-btn {
        background: none;
        border: none;
        color: var(--spotify-text-secondary);
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;

        &:active {
          transform: scale(0.9);
        }

        &:has(app-icon-heart[filled="true"]) {
          color: var(--spotify-green);
        }
      }

      .duration {
        font-size: 13px;
        color: var(--spotify-text-secondary);
        min-width: 40px;
        text-align: right;
      }
    `,
  ],
})
export class TrackItemComponent {
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

  playTrack(): void {
    if (this.isCurrentTrack()) {
      this.musicService.togglePlay();
    } else {
      if (this.parentPlaylistId == -1) {
        this.musicService.setPlaylistQeue([]);
      } else {
        this.musicService.setPlaylistQeue(
          this.playlistService.playlistSelected.queue
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
