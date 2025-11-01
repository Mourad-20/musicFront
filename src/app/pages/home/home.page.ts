import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MusicService } from '../../services/music.service';
import { Playlist, Track } from '../../models/track.model';
import { PlaylistCardComponent } from '../../components/playlist-card/playlist-card.component';
import { TrackItemComponent } from '../../components/track-item/track-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, PlaylistCardComponent, TrackItemComponent],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title class="page-title">Good Evening</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="home-content fade-in">
        <section class="section">
          <h2 class="section-title">Recently Played</h2>
          <div class="scrollable-horizontal">
            <app-playlist-card
              *ngFor="let playlist of recentPlaylists"
              [playlist]="playlist">
            </app-playlist-card>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Your Top Mix</h2>
          <div class="scrollable-horizontal">
            <app-playlist-card
              *ngFor="let playlist of topMix"
              [playlist]="playlist">
            </app-playlist-card>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Recommended for You</h2>
          <div class="track-list">
            <app-track-item
              *ngFor="let track of recommendedTracks"
              [track]="track">
            </app-track-item>
          </div>
        </section>

        <div class="spacer"></div>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-toolbar {
      padding: 16px 0;
    }

    .page-title {
      font-size: 24px;
      font-weight: 700;
      padding: 0 16px;
    }

    .home-content {
      padding: 16px 0;
    }

    .section {
      margin-bottom: 32px;
    }

    .section-title {
      font-size: 22px;
      font-weight: 700;
      color: var(--spotify-text);
      padding: 0 16px;
      margin-bottom: 16px;
    }

    .track-list {
      padding: 0;
    }

    .spacer {
      height: 80px;
    }
  `]
})
export class HomePage implements OnInit {
  recentPlaylists: Playlist[] = [];
  topMix: Playlist[] = [];
  recommendedTracks: Track[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    const allPlaylists = this.musicService.getPlaylists();
    this.recentPlaylists = allPlaylists.slice(0, 3);
    this.topMix = allPlaylists.slice(3, 6);
    this.recommendedTracks = this.musicService.getTracks().slice(0, 5);
  }
}
