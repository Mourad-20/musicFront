import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MusicService } from '../../services/music.service';
import { Playlist } from '../../models/track.model';
import { PlaylistCardComponent } from '../../components/playlist-card/playlist-card.component';
import { IconLibraryComponent } from '../../components/icons/icons.components';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, IonicModule, PlaylistCardComponent, IconLibraryComponent],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title class="page-title">
          <app-icon-library [size]="28"></app-icon-library>
          <span>Your Library</span>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="library-content fade-in">
        <div class="filter-chips">
          <div class="chip" [class.active]="selectedFilter === 'all'" (click)="selectFilter('all')">
            All
          </div>
          <div class="chip" [class.active]="selectedFilter === 'playlists'" (click)="selectFilter('playlists')">
            Playlists
          </div>
          <div class="chip" [class.active]="selectedFilter === 'artists'" (click)="selectFilter('artists')">
            Artists
          </div>
          <div class="chip" [class.active]="selectedFilter === 'albums'" (click)="selectFilter('albums')">
            Albums
          </div>
        </div>

        <div class="library-grid">
          <app-playlist-card
            *ngFor="let playlist of playlists"
            [playlist]="playlist">
          </app-playlist-card>
        </div>

        <div class="spacer"></div>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-toolbar {
      padding: 16px 0;
    }

    .page-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: 700;
      padding: 0 16px;
    }

    .library-content {
      padding: 16px;
    }

    .filter-chips {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .chip {
      padding: 8px 16px;
      background: var(--spotify-gray-light);
      color: var(--spotify-text);
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;

      &.active {
        background: var(--spotify-green);
        color: var(--spotify-black);
      }

      &:active {
        transform: scale(0.95);
      }
    }

    .library-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

      @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .spacer {
      height: 80px;
    }
  `]
})
export class LibraryPage implements OnInit {
  playlists: Playlist[] = [];
  selectedFilter = 'all';

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.playlists = this.musicService.getPlaylists();
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
  }
}
