import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../../services/music.service';
import { Playlist } from '../../models/track.model';
import { TrackItemComponent } from '../../components/track-item/track-item.component';
import { IconPlayComponent } from '../../components/icons/icon-play.component';
import { IconShuffleComponent, IconMoreVerticalComponent, IconDownloadComponent, IconShareComponent } from '../../components/icons/icons.components';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TrackItemComponent,
    IconPlayComponent,
    IconShuffleComponent,
    IconMoreVerticalComponent,
    IconDownloadComponent,
    IconShareComponent
  ],
  template: `
    <ion-header class="transparent-header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/library"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button>
            <app-icon-more-vertical [size]="24"></app-icon-more-vertical>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" *ngIf="playlist">
      <div class="playlist-content fade-in">
        <div class="header-section">
          <div class="cover-wrapper">
            <img [src]="playlist.coverUrl" [alt]="playlist.name" class="cover">
          </div>
          <h1 class="playlist-name">{{ playlist.name }}</h1>
          <p class="playlist-description">{{ playlist.description }}</p>
          <div class="playlist-meta">
            <span class="owner">{{ playlist.owner }}</span>
            <span class="separator">•</span>
            <span class="track-count">{{ playlist.trackCount }} songs</span>
          </div>
        </div>

        <div class="actions-section">
          <button class="play-button" (click)="playPlaylist()">
            <app-icon-play [size]="24"></app-icon-play>
          </button>
          <button class="shuffle-button" (click)="shufflePlaylist()">
            <app-icon-shuffle [size]="24"></app-icon-shuffle>
          </button>
          <button class="action-btn">
            <app-icon-download [size]="24"></app-icon-download>
          </button>
          <button class="action-btn">
            <app-icon-share [size]="24"></app-icon-share>
          </button>
        </div>

        <div class="track-list" *ngIf="playlist.tracks">
          <app-track-item
            *ngFor="let track of playlist.tracks"
            [track]="track">
          </app-track-item>
        </div>

        <div class="spacer"></div>
      </div>
    </ion-content>
  `,
  styles: [`
    .transparent-header {
      ion-toolbar {
        --background: transparent;
      }
    }

    .playlist-content {
      padding: 0;
    }

    .header-section {
      background: linear-gradient(180deg, var(--spotify-gray-lighter) 0%, var(--spotify-dark) 100%);
      padding: 16px 16px 32px;
      text-align: center;
    }

    .cover-wrapper {
      width: 200px;
      height: 200px;
      margin: 0 auto 24px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
    }

    .cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .playlist-name {
      font-size: 28px;
      font-weight: 700;
      color: var(--spotify-text);
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .playlist-description {
      font-size: 14px;
      color: var(--spotify-text-secondary);
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .playlist-meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13px;
      color: var(--spotify-text-secondary);
    }

    .owner {
      font-weight: 600;
    }

    .separator {
      font-size: 8px;
    }

    .actions-section {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px 16px;
    }

    .play-button {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--spotify-green);
      color: var(--spotify-black);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 16px rgba(29, 185, 84, 0.3);

      &:active {
        transform: scale(0.95);
        background: var(--spotify-green-dark);
      }
    }

    .shuffle-button {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: transparent;
      color: var(--spotify-text);
      border: 2px solid var(--spotify-text);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;

      &:active {
        transform: scale(0.95);
        opacity: 0.8;
      }
    }

    .action-btn {
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

    .track-list {
      padding: 0;
    }

    .spacer {
      height: 80px;
    }
  `]
})
export class PlaylistPage implements OnInit {
  playlist?: Playlist;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.playlist = this.musicService.getPlaylistById(id);
    }
  }

  playPlaylist(): void {
    if (this.playlist?.tracks && this.playlist.tracks.length > 0) {
      this.musicService.playTrack(this.playlist.tracks[0]);
    }
  }

  shufflePlaylist(): void {
    if (this.playlist?.tracks && this.playlist.tracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.playlist.tracks.length);
      this.musicService.playTrack(this.playlist.tracks[randomIndex]);
    }
  }
}
