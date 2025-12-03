export interface Track {
  id: number;
  title: string;
  url: string;
  info: string;
  morceauID: string;
  isInFavorie: boolean;
}
export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playlist: Track[];
  playlistSugg: Track[];
  currentIndex: number;
  isLoading: boolean;
}
export interface TrackInfo {
  img: string;
  duration: string;
  Author:
    | string
    | {
        ChannelId?: { Value: string };
        ChannelUrl?: string;
        ChannelTitle?: string;
        Title?: string;
      };
}
export interface Setting {
  playOne: boolean;
  saveCloud: boolean;
  playInLoop: boolean;
  maxPlayEnable: boolean;
  stopTimeEnable: boolean;
  maxPlay: number;
  stopTime: number;
}

export interface playlistObj {
  id: number;
  name: string;
  parametre: string;
  count: number;
  sugg?: Track[];
  queue?: Track[];
}

export interface User {
  id: number;
  name: string;
}

export interface _auth {
  login: string;
  password: string;
}
