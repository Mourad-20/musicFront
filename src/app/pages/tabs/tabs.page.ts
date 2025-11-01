import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MiniPlayerComponent } from '../../components/mini-player/mini-player.component';
import { IconHomeComponent, IconSearchComponent, IconLibraryComponent } from '../../components/icons/icons.components';
import { IconHeartComponent } from '../../components/icons/icon-heart.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    MiniPlayerComponent,
    IconHomeComponent,
    IconSearchComponent,
    IconLibraryComponent,
    IconHeartComponent
  ],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
          <app-icon-home [size]="24"></app-icon-home>
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search">
          <app-icon-search [size]="24"></app-icon-search>
          <ion-label>Search</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="library">
          <app-icon-library [size]="24"></app-icon-library>
          <ion-label>Library</ion-label>
        </ion-tab-button>

        <ion-tab-button (click)="goToFavorites()">
          <app-icon-heart [size]="24" [filled]="false"></app-icon-heart>
          <ion-label>Favorites</ion-label>
        </ion-tab-button>
      </ion-tab-bar>

      <app-mini-player></app-mini-player>
    </ion-tabs>
  `,
  styles: [`
    ion-tabs {
      position: relative;
    }
  `]
})
export class TabsPage {
  goToFavorites(): void {
    window.location.href = '/favorites';
  }
}
