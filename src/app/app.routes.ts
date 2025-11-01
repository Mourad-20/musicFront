import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/search/search.page').then(m => m.SearchPage)
      },
      {
        path: 'library',
        loadComponent: () => import('./pages/library/library.page').then(m => m.LibraryPage)
      }
    ]
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then(m => m.FavoritesPage)
  },
  {
    path: 'now-playing',
    loadComponent: () => import('./pages/now-playing/now-playing.page').then(m => m.NowPlayingPage)
  },
  {
    path: 'playlist/:id',
    loadComponent: () => import('./pages/playlist/playlist.page').then(m => m.PlaylistPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
  }
];
