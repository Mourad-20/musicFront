import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MusicService } from '../../services/music.service';
import { Track, Playlist } from '../../models/track.model';
import { TrackItemComponent } from '../../components/track-item/track-item.component';
import { PlaylistCardComponent } from '../../components/playlist-card/playlist-card.component';
import { IconSearchComponent } from '../../components/icons/icons.components';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, TrackItemComponent, PlaylistCardComponent, IconSearchComponent],
  template: `
    <ion-header>
      <ion-toolbar>
        <div class="search-header">
          <div class="search-bar-wrapper">
            <div class="search-icon">
              <app-icon-search [size]="20"></app-icon-search>
            </div>
            <input
              type="text"
              class="search-input"
              placeholder="What do you want to listen to?"
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange()">
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="search-content fade-in">
        <div *ngIf="!searchQuery()" class="browse-section">
          <h2 class="section-title">Browse All</h2>
          <div class="genre-grid">
            <div class="genre-card" *ngFor="let genre of genres" [style.background]="genre.color">
              <span class="genre-name">{{ genre.name }}</span>
            </div>
          </div>
        </div>

        <div *ngIf="searchQuery()" class="results-section">
          <div *ngIf="filteredTracks().length > 0" class="section">
            <h2 class="section-title">Tracks</h2>
            <div class="track-list">
              <app-track-item
                *ngFor="let track of filteredTracks()"
                [track]="track">
              </app-track-item>
            </div>
          </div>

          <div *ngIf="filteredPlaylists().length > 0" class="section">
            <h2 class="section-title">Playlists</h2>
            <div class="scrollable-horizontal">
              <app-playlist-card
                *ngFor="let playlist of filteredPlaylists()"
                [playlist]="playlist">
              </app-playlist-card>
            </div>
          </div>

          <div *ngIf="filteredTracks().length === 0 && filteredPlaylists().length === 0" class="no-results">
            <p>No results found for "{{ searchQuery() }}"</p>
          </div>
        </div>

        <div class="spacer"></div>
      </div>
    </ion-content>
  `,
  styles: [`
    .search-header {
      padding: 8px 16px;
    }

    .search-bar-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background: var(--spotify-text);
      border-radius: 24px;
      padding: 12px 16px;
    }

    .search-icon {
      color: var(--spotify-black);
      margin-right: 8px;
      display: flex;
      align-items: center;
    }

    .search-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: var(--spotify-black);
      font-size: 14px;
      font-weight: 500;

      &::placeholder {
        color: rgba(0, 0, 0, 0.6);
      }
    }

    .search-content {
      padding: 16px 0;
    }

    .browse-section {
      padding: 0 16px;
    }

    .section-title {
      font-size: 22px;
      font-weight: 700;
      color: var(--spotify-text);
      margin-bottom: 16px;
    }

    .genre-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-top: 16px;
    }

    .genre-card {
      aspect-ratio: 1.5;
      border-radius: 8px;
      padding: 16px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.2s ease;

      &:active {
        transform: scale(0.98);
      }
    }

    .genre-name {
      font-size: 16px;
      font-weight: 700;
      color: var(--spotify-text);
    }

    .results-section {
      .section {
        margin-bottom: 32px;

        .section-title {
          padding: 0 16px;
        }
      }
    }

    .no-results {
      text-align: center;
      padding: 40px 16px;
      color: var(--spotify-text-secondary);
    }

    .spacer {
      height: 80px;
    }
  `]
})
export class SearchPage {
  searchQuery = signal('');
  filteredTracks = signal<Track[]>([]);
  filteredPlaylists = signal<Playlist[]>([]);

  genres = [
    { name: 'Pop', color: '#e13300' },
    { name: 'Hip-Hop', color: '#ba5d07' },
    { name: 'Rock', color: '#dc148c' },
    { name: 'Latin', color: '#8d67ab' },
    { name: 'Electronic', color: '#1e3264' },
    { name: 'R&B', color: '#af2896' },
    { name: 'Jazz', color: '#27856a' },
    { name: 'Country', color: '#8d67ab' }
  ];

  constructor(private musicService: MusicService) {}

  onSearchChange(): void {
    const query = this.searchQuery().toLowerCase();

    if (!query) {
      this.filteredTracks.set([]);
      this.filteredPlaylists.set([]);
      return;
    }

    const tracks = this.musicService.getTracks().filter(track =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query)
    );

    const playlists = this.musicService.getPlaylists().filter(playlist =>
      playlist.name.toLowerCase().includes(query) ||
      playlist.description.toLowerCase().includes(query)
    );

    this.filteredTracks.set(tracks);
    this.filteredPlaylists.set(playlists);
  }
}
