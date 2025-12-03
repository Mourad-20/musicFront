import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MusicService } from "../../services/music.service";
import { Playlist } from "../../models/track.model";
import { playlistObj, Track } from "../../interfaces/app.interfaces";
import { PlaylistCardComponent } from "../../components/playlist-card/playlist-card.component";
import { IconLibraryComponent } from "../../components/icons/icons.components";
import { TrackService } from "../../services/track.service";
import { TrackItemComponent } from "../../components/track-item/track-item.component";
import { TrackItemHomeComponent } from "../../components/track-item/track-item-style-home.component";
import { PlaylistService } from "../../services/playlist.service";
@Component({
  selector: "app-library",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    //PlaylistCardComponent,
    IconLibraryComponent,
    PlaylistCardComponent,
    TrackItemComponent,
    //TrackItemHomeComponent,
  ],
  templateUrl: "./library.page.html",
  styleUrls: ["./library.page.scss"],
})
export class LibraryPage implements OnInit {
  playlists: playlistObj[] = [];
  historiqueTraks: Track[] = [];
  selectedFilter = "history";
  pageHNumber: number = 1;
  pageSize = 20;
  constructor(
    private musicService: MusicService,
    private trackService: TrackService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit() {
    debugger;
    this.historiqueTraks = this.trackService.Historieplaylist;
    this.playlists = this.playlistService.playlists;
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
  }
  nextPage(event: any) {
    this.pageHNumber = this.pageHNumber + 1;
    /* if (this.inputsearch.trim().length >= 3) {
      this.cloudService
        .SearchMorceaux(this.inputsearch, 0, this.pageNumber, this.pageSize)
        .subscribe((res: any) => {
          this.listTrack = [...this.listTrack, ...res["morceauVMs"]];
          this.filtre("", this.listTrack);
          if (res["morceauVMs"].length === 0) {
            event.target.disabled = true;
          }
          /*  for(let a of this.g.articlesOrg){
								  a.PathImage = this.g.baseUrl + '/api/Article/showImageArticle?identifiant=' + a.Identifiant;
                } */
    /*event.target.complete();
        });
    } else {*/

    this.musicService
      .gethistory(this.pageHNumber, this.pageSize)
      .subscribe((res: any) => {
        this.historiqueTraks = [...this.historiqueTraks, ...res["morceauVMs"]];
        //this.filtre("", this.listTrack);
        /*  for(let a of this.g.articlesOrg){
								  a.PathImage = this.g.baseUrl + '/api/Article/showImageArticle?identifiant=' + a.Identifiant;
                } */
        if (res["morceauVMs"].length === 0) {
          event.target.disabled = true;
        }
        event.target.complete();
      });
    /* }*/
  }
}
