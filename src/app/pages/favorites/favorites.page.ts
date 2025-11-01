import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MusicService } from '../../services/music.service';
import { TrackItemComponent } from '../../components/track-item/track-item.component';
import { IconHeartComponent } from '../../components/icons/icon-heart.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, IonicModule, TrackItemComponent, IconHeartComponent],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Liked Songs</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="favorites-content fade-in">
        <div class="header-section">
          <div class="heart-icon-large">
            <app-icon-heart [size]="80" [filled]="true"></app-icon-heart>
          </div>
          <h1 class="title">Liked Songs</h1>
          <p class="count">{{ favoriteTracks().length }} songs</p>
        </div>

        <div *ngIf="favoriteTracks().length > 0" class="track-list">
          <app-track-item
            *ngFor="let track of favoriteTracks()"
            [track]="track">
          </app-track-item>
        </div>

        <div *ngIf="favoriteTracks().length === 0" class="empty-state">
          <app-icon-heart [size]="64" [filled]="false"></app-icon-heart>
          <h3>No liked songs yet</h3>
          <p>Songs you like will appear here</p>
        </div>

        <div class="spacer"></div>
      </div>
    </ion-content>
  `,
  styles: [`
    .favorites-content {
      padding: 0;
    }

    .header-section {
      background: linear-gradient(180deg, var(--spotify-gray-lighter) 0%, var(--spotify-dark) 100%);
      padding: 32px 16px;
      text-align: center;
    }

    .heart-icon-large {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, #450af5, #c4efd9);
      border-radius: 8px;
      color: var(--spotify-text);
      margin-bottom: 24px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    .title {
      font-size: 32px;
      font-weight: 700;
      color: var(--spotify-text);
      margin-bottom: 8px;
    }

    .count {
      font-size: 14px;
      color: var(--spotify-text-secondary);
    }

    .track-list {
      padding: 16px 0;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 16px;
      text-align: center;
      color: var(--spotify-text-secondary);

      h3 {
        font-size: 20px;
        font-weight: 600;
        margin: 24px 0 8px;
        color: var(--spotify-text);
      }

      p {
        font-size: 14px;
      }
    }

    .spacer {
      height: 80px;
    }
  `]
})
export class FavoritesPage {
  favoriteTracks = computed(() => this.musicService.getFavoriteTracks());

  constructor(private musicService: MusicService) {}
}
