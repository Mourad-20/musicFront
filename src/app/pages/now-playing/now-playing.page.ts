import { Component, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { MusicService } from '../../services/music.service';
import { IconPlayComponent } from '../../components/icons/icon-play.component';
import { IconPauseComponent } from '../../components/icons/icon-pause.component';
import { IconHeartComponent } from '../../components/icons/icon-heart.component';
import {
  IconNextComponent,
  IconPreviousComponent,
  IconShuffleComponent,
  IconRepeatComponent,
  IconMoreVerticalComponent
} from '../../components/icons/icons.components';

@Component({
  selector: 'app-now-playing',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IconPlayComponent,
    IconPauseComponent,
    IconHeartComponent,
    IconNextComponent,
    IconPreviousComponent,
    IconShuffleComponent,
    IconRepeatComponent,
    IconMoreVerticalComponent
  ],
  template: `
    <ion-header class="transparent-header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="close()">
            <ion-icon name="chevron-down"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button>
            <app-icon-more-vertical [size]="24"></app-icon-more-vertical>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="currentTrack()">
      <div class="now-playing-content fade-in">
        <div class="cover-section">
          <div class="cover-wrapper pulse">
            <img [src]="currentTrack()!.coverUrl" [alt]="currentTrack()!.title" class="cover">
          </div>
        </div>

        <div class="info-section">
          <div class="track-info">
            <h1 class="track-title">{{ currentTrack()!.title }}</h1>
            <p class="track-artist">{{ currentTrack()!.artist }}</p>
          </div>
          <button class="heart-btn" (click)="toggleFavorite()">
            <app-icon-heart [size]="28" [filled]="isFavorite()"></app-icon-heart>
          </button>
        </div>

        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="progress()"></div>
            <div class="progress-thumb" [style.left.%]="progress()"></div>
          </div>
          <div class="time-labels">
            <span>{{ formatTime(currentTime()) }}</span>
            <span>{{ formatTime(currentTrack()!.duration) }}</span>
          </div>
        </div>

        <div class="controls-section">
          <div class="secondary-controls">
            <button class="control-btn">
              <app-icon-shuffle [size]="24"></app-icon-shuffle>
            </button>
          </div>

          <div class="main-controls">
            <button class="control-btn" (click)="previous()">
              <app-icon-previous [size]="32"></app-icon-previous>
            </button>

            <button class="play-btn" (click)="togglePlay()">
              <app-icon-pause *ngIf="isPlaying()" [size]="32"></app-icon-pause>
              <app-icon-play *ngIf="!isPlaying()" [size]="32"></app-icon-play>
            </button>

            <button class="control-btn" (click)="next()">
              <app-icon-next [size]="32"></app-icon-next>
            </button>
          </div>

          <div class="secondary-controls">
            <button class="control-btn">
              <app-icon-repeat [size]="24"></app-icon-repeat>
            </button>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .transparent-header {
      ion-toolbar {
        --background: transparent;
      }
    }

    .now-playing-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 16px 24px 40px;
      background: linear-gradient(180deg, var(--spotify-gray-lighter) 0%, var(--spotify-dark) 50%);
    }

    .cover-section {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 0;
    }

    .cover-wrapper {
      width: 100%;
      max-width: 400px;
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
    }

    .cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .info-section {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 32px;
    }

    .track-info {
      flex: 1;
      min-width: 0;
    }

    .track-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--spotify-text);
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .track-artist {
      font-size: 16px;
      color: var(--spotify-text-secondary);
      margin: 0;
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

    .progress-section {
      margin-bottom: 32px;
    }

    .progress-bar {
      position: relative;
      height: 4px;
      background: var(--spotify-gray-lighter);
      border-radius: 2px;
      margin-bottom: 8px;
      cursor: pointer;
    }

    .progress-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--spotify-text);
      border-radius: 2px;
      transition: width 0.1s linear;
    }

    .progress-thumb {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: var(--spotify-text);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.2s ease;

      .progress-bar:hover & {
        opacity: 1;
      }
    }

    .time-labels {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--spotify-text-secondary);
    }

    .controls-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .secondary-controls {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .main-controls {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .control-btn {
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
        color: var(--spotify-text);
      }
    }

    .play-btn {
      background: var(--spotify-text);
      color: var(--spotify-black);
      border: none;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);

      &:active {
        transform: scale(0.95);
      }
    }
  `]
})
export class NowPlayingPage implements OnInit, OnDestroy {
  currentTrack = this.musicService.currentTrack;
  isPlaying = this.musicService.isPlaying;
  currentTime = this.musicService.currentTime;

  isFavorite = computed(() => {
    const track = this.currentTrack();
    return track ? this.musicService.isFavorite(track.id) : false;
  });

  progress = computed(() => {
    const track = this.currentTrack();
    const time = this.currentTime();
    if (!track) return 0;
    return (time / track.duration) * 100;
  });

  private interval?: number;

  constructor(
    private musicService: MusicService,
    private router: Router
  ) {}

  ngOnInit() {
    this.interval = window.setInterval(() => {
      if (this.isPlaying()) {
        const current = this.currentTime();
        const track = this.currentTrack();
        if (track && current < track.duration) {
          this.musicService.currentTime.set(current + 1);
        }
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  togglePlay(): void {
    this.musicService.togglePlay();
  }

  next(): void {
    this.musicService.nextTrack();
    this.musicService.currentTime.set(0);
  }

  previous(): void {
    this.musicService.previousTrack();
    this.musicService.currentTime.set(0);
  }

  toggleFavorite(): void {
    const track = this.currentTrack();
    if (track) {
      this.musicService.toggleFavorite(track.id);
    }
  }

  formatTime(seconds: number): string {
    return this.musicService.formatDuration(seconds);
  }

  close(): void {
    this.router.navigate(['/tabs/home']);
  }
}
