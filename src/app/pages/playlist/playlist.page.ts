import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { MusicService } from "../../services/music.service";
import { PlaylistService } from "../../services/playlist.service";
import { Playlist } from "../../models/track.model";
import { TrackItemComponent } from "../../components/track-item/track-item.component";
import { IconPlayComponent } from "../../components/icons/icon-play.component";
import { playlistObj } from "../../interfaces/app.interfaces";
import { MiniPlayerComponent } from "../../components/mini-player/mini-player.component";
import {
  IconShuffleComponent,
  IconMoreVerticalComponent,
  IconDownloadComponent,
  IconShareComponent,
} from "../../components/icons/icons.components";

@Component({
  selector: "app-playlist",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    //TrackItemComponent,
    IconPlayComponent,
    IconShuffleComponent,
    IconMoreVerticalComponent,
    IconDownloadComponent,
    IconShareComponent,
    TrackItemComponent,
    MiniPlayerComponent,
  ],
  templateUrl: "./playlist.page.html",
  styleUrls: ["./playlist.page.scss"],
})
export class PlaylistPage implements OnInit {
  playlist?: playlistObj;
  isShrunk = false;
  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    public playlistService: PlaylistService
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    if (!isNaN(id)) {
      this.playlistService.playlistSelected =
        await this.playlistService.getPlaylistById(id);
    }
  }

  playPlaylist(): void {
    if (this.playlist?.queue && this.playlist.queue.length > 0) {
      //this.musicService.playTrack(this.playlist.tracks[0]);
    }
  }

  shufflePlaylist(): void {
    /* if (this.playlist?.tracks && this.playlist.tracks.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * this.playlist.tracks.length
      );
      this.musicService.playTrack(this.playlist.tracks[randomIndex]);
    }*/
  }
}
