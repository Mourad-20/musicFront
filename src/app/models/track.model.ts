export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  isFavorite?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  owner: string;
  trackCount: number;
  tracks?: Track[];
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  followers: number;
}
