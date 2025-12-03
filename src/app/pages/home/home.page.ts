import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MusicService } from "../../services/music.service";
import { Playlist, Track1 } from "../../models/track.model";
import { PlaylistCardComponent } from "../../components/playlist-card/playlist-card.component";
import { TrackItemComponent } from "../../components/track-item/track-item.component";
import { TrackItemHomeComponent } from "../../components/track-item/track-item-style-home.component";
import { IconMusicComponent } from "../../components/icons/icon-music.component";
import { IconPlayComponent } from "../../components/icons/icon-play.component";
import { IconTopComponent } from "../../components/icons/icons.components";

import { TrackService } from "../../services/track.service";
import { PlaylistService } from "../../services/playlist.service";
import { Track, playlistObj, TrackInfo } from "../../interfaces/app.interfaces";
@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,

    PlaylistCardComponent,
    //TrackItemComponent,
    //TrackItemComponent2,
    TrackItemHomeComponent,
    IconMusicComponent,
    IconPlayComponent,
    IconTopComponent,
  ],
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  recentPlaylists: Playlist[] = [];
  topMix: Playlist[] = [];
  recommendedTracks: Track[] = [];

  recentTracks: Track[] = [];
  playlists: playlistObj[] = [];
  queueLists: playlistObj[] = [];
  constructor(
    private musicService: MusicService,
    private trackService: TrackService,
    private playlistService: PlaylistService
  ) {}
  private mockTracks: Track1[] = [
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: 200,
      coverUrl:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: 200,
      coverUrl:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];
  ngOnInit() {
    this.loadData();
    //const allPlaylists = this.musicService.getPlaylists();
    //this.recentPlaylists = allPlaylists.slice(0, 3);
    //this.topMix = allPlaylists.slice(3, 6);
    // this.recommendedTracks = this.musicService.getTracks().slice(0, 5);
  }
  loadData() {
    this.recentTracks = this.trackService.getRecentTracks();
    //this.playlists = this.playlistService.playlists;
    this.playlists = Array(5).fill(this.playlistService.playlists).flat();
    this.queueLists = this.playlistService.queuelistVMs;
  }
}
