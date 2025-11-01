import { Injectable, signal } from '@angular/core';
import { Track, Playlist, Artist } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  currentTrack = signal<Track | null>(null);
  isPlaying = signal<boolean>(false);
  currentTime = signal<number>(0);
  favorites = signal<Set<string>>(new Set());

  private mockTracks: Track[] = [
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 200,
      coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 215,
      coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: 203,
      coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      title: 'Peaches',
      artist: 'Justin Bieber',
      album: 'Justice',
      duration: 198,
      coverUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      title: 'Good 4 U',
      artist: 'Olivia Rodrigo',
      album: 'SOUR',
      duration: 178,
      coverUrl: 'https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      title: 'Stay',
      artist: 'The Kid LAROI, Justin Bieber',
      album: 'Stay',
      duration: 141,
      coverUrl: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '7',
      title: 'Heat Waves',
      artist: 'Glass Animals',
      album: 'Dreamland',
      duration: 239,
      coverUrl: 'https://images.pexels.com/photos/1122462/pexels-photo-1122462.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '8',
      title: 'drivers license',
      artist: 'Olivia Rodrigo',
      album: 'SOUR',
      duration: 242,
      coverUrl: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  private mockPlaylists: Playlist[] = [
    {
      id: 'p1',
      name: 'Today\'s Top Hits',
      description: 'The hottest tracks right now',
      coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Spotify',
      trackCount: 50
    },
    {
      id: 'p2',
      name: 'RapCaviar',
      description: 'New music from Drake, Travis Scott and more',
      coverUrl: 'https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Spotify',
      trackCount: 50
    },
    {
      id: 'p3',
      name: 'All Out 2020s',
      description: 'The biggest hits of the 2020s',
      coverUrl: 'https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Spotify',
      trackCount: 150
    },
    {
      id: 'p4',
      name: 'Rock Classics',
      description: 'Rock legends & epic songs',
      coverUrl: 'https://images.pexels.com/photos/1327430/pexels-photo-1327430.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Spotify',
      trackCount: 100
    },
    {
      id: 'p5',
      name: 'Chill Vibes',
      description: 'Lay back and enjoy the vibes',
      coverUrl: 'https://images.pexels.com/photos/1125850/pexels-photo-1125850.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Spotify',
      trackCount: 80
    },
    {
      id: 'p6',
      name: 'Mood Booster',
      description: 'Get happy with today\'s hits',
      coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
      owner: 'Spotify',
      trackCount: 75
    }
  ];

  private mockArtists: Artist[] = [
    {
      id: 'a1',
      name: 'The Weeknd',
      imageUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400',
      followers: 85000000
    },
    {
      id: 'a2',
      name: 'Dua Lipa',
      imageUrl: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
      followers: 65000000
    },
    {
      id: 'a3',
      name: 'Justin Bieber',
      imageUrl: 'https://images.pexels.com/photos/1086723/pexels-photo-1086723.jpeg?auto=compress&cs=tinysrgb&w=400',
      followers: 75000000
    }
  ];

  getTracks(): Track[] {
    return this.mockTracks;
  }

  getPlaylists(): Playlist[] {
    return this.mockPlaylists;
  }

  getArtists(): Artist[] {
    return this.mockArtists;
  }

  getTrackById(id: string): Track | undefined {
    return this.mockTracks.find(t => t.id === id);
  }

  getPlaylistById(id: string): Playlist | undefined {
    const playlist = this.mockPlaylists.find(p => p.id === id);
    if (playlist) {
      return {
        ...playlist,
        tracks: this.mockTracks.slice(0, 8)
      };
    }
    return undefined;
  }

  playTrack(track: Track): void {
    this.currentTrack.set(track);
    this.isPlaying.set(true);
  }

  togglePlay(): void {
    this.isPlaying.update(playing => !playing);
  }

  nextTrack(): void {
    const current = this.currentTrack();
    if (!current) return;

    const currentIndex = this.mockTracks.findIndex(t => t.id === current.id);
    const nextIndex = (currentIndex + 1) % this.mockTracks.length;
    this.playTrack(this.mockTracks[nextIndex]);
  }

  previousTrack(): void {
    const current = this.currentTrack();
    if (!current) return;

    const currentIndex = this.mockTracks.findIndex(t => t.id === current.id);
    const prevIndex = currentIndex === 0 ? this.mockTracks.length - 1 : currentIndex - 1;
    this.playTrack(this.mockTracks[prevIndex]);
  }

  toggleFavorite(trackId: string): void {
    const favs = new Set(this.favorites());
    if (favs.has(trackId)) {
      favs.delete(trackId);
    } else {
      favs.add(trackId);
    }
    this.favorites.set(favs);
  }

  isFavorite(trackId: string): boolean {
    return this.favorites().has(trackId);
  }

  getFavoriteTracks(): Track[] {
    const favIds = this.favorites();
    return this.mockTracks.filter(t => favIds.has(t.id));
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
