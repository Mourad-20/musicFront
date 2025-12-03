import { Component, Input, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { MusicService } from "../../services/music.service";
import { TrackService } from "../../services/track.service";
import { IconPlayComponent } from "../icons/icon-play.component";
import { IconPauseComponent } from "../icons/icon-pause.component";
import { IconHeartComponent } from "../icons/icon-heart.component";
import { take, map } from "rxjs";
@Component({
  selector: "app-mini-player",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IconPlayComponent,
    IconPauseComponent,
    IconHeartComponent,
  ],
  template: `
    <div
      class="mini-player"
      [class.tabs]="tabs"
      *ngIf="currentTrack()"
      (click)="openNowPlaying()"
    >
      <div class="progress-bar">
        <div class="progress-fill" [style.width.%]="progress$ | async"></div>
      </div>
      <div class="track-info">
        <img
          [src]="getimgUrl(currentTrack()!.info)"
          [alt]="currentTrack()!.title"
          class="cover"
        />
        <div class="info">
          <div class="title text-ellipsis">{{ currentTrack()!.title }}</div>
        </div>
      </div>

      <div class="controls">
        <button class="heart-btn" (click)="toggleFavorite($event)">
          <app-icon-heart [size]="20" [filled]="isFavorite()"></app-icon-heart>
        </button>
        <button class="play-btn" (click)="togglePlay($event)">
          <app-icon-pause *ngIf="isPlaying()" [size]="24"></app-icon-pause>
          <app-icon-play *ngIf="!isPlaying()" [size]="24"></app-icon-play>
        </button>
      </div>

      <div class="progress-bar">
        <div class="progress" [style.width.%]="progress()"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .mini-player {
        position: fixed;
        bottom: 0px;
        left: 0;
        right: 0;
        height: 64px;
        background: linear-gradient(
          to right,
          var(--spotify-gray-light),
          var(--spotify-gray)
        );
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        z-index: 1000;
        cursor: pointer;
        transition: all 0.3s ease;

        &:active {
          opacity: 0.9;
        }
      }
      .mini-player.tabs {
        bottom: 56px !important;
      }
      .track-info {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 0;
      }
      .progress-bar-container {
        padding: 12px 0;
        cursor: pointer;
      }

      .progress-bar-bg {
        position: relative;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
      }

      .progress-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: #1db954;
        border-radius: 2px;
        transition: width 0.1s linear;
        box-shadow: 0 0 12px rgba(29, 185, 84, 0.5);
      }
      .cover {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        object-fit: cover;
      }

      .info {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-size: 14px;
        font-weight: 600;
        color: var(--spotify-text);
        margin-bottom: 2px;
      }

      .artist {
        font-size: 12px;
        color: var(--spotify-text-secondary);
      }

      .controls {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .heart-btn,
      .play-btn {
        background: none;
        border: none;
        color: var(--spotify-text);
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;

        &:active {
          transform: scale(0.95);
        }
      }

      .heart-btn {
        color: var(--spotify-text-secondary);

        &:has(app-icon-heart[filled="true"]) {
          color: var(--spotify-green);
        }
      }

      .progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: rgba(255, 255, 255, 0.1);
      }

      .progress {
        height: 100%;
        background: var(--spotify-green);
        transition: width 0.1s linear;
      }
    `,
  ],
})
export class MiniPlayerComponent {
  currentTrack = this.musicService.currentTrack;
  isPlaying = this.musicService.isPlaying;
  @Input() tabs: boolean = true;
  isFavorite = computed(() => {
    const track = this.currentTrack();
    return track ? this.musicService.isFavorite(track.url) : false;
  });

  progress = computed(() => {
    const track = this.currentTrack();
    const time = this.musicService.currentTime();
    if (!track) return 0;
    return (time / this.trackService.extractduration(track?.info)) * 100;
  });

  constructor(
    private musicService: MusicService,
    private router: Router,
    private trackService: TrackService
  ) {}
  progress$ = this.musicService.playerState$.pipe(
    map((state) =>
      state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0
    )
  );
  togglePlay(event: Event): void {
    event.stopPropagation();
    this.musicService.togglePlay();
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    const track = this.currentTrack();
    if (track) {
      this.musicService.toggleFavorite(track.url);
    }
  }
  getimgUrl(info: string): string {
    return this.trackService.extractImageUrl(info);
  }
  openNowPlaying(): void {
    this.router.navigate(["/now-playing"]);
  }
}
