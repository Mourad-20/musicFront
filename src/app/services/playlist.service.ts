import { Injectable } from "@angular/core";
import { playlistObj, Track } from "../interfaces/app.interfaces";
import { firstValueFrom } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class PlaylistService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  playlists: playlistObj[] = [];
  queuelistVMs: any[] = [];
  idFavorie: number = 0;
  playlistSelected: playlistObj | any;
  constructor(private http: HttpClient) {}

  setPlaylists(playlists: playlistObj[]): void {
    this.playlists = playlists;
  }

  setQueuelistVMs(queuelists: any[]): void {
    this.queuelistVMs = queuelists;
  }

  setIdFavorie(id: number): void {
    this.idFavorie = id;
  }

  /*getPlaylistPlayById(id: number): Playlistplay | undefined {
    return this.playlists.find((p) => p.id === id);
  }*/
  async getPlaylistById(id: number): Promise<playlistObj | undefined> {
    const playlist = this.playlists.find((p) => p.id === id);
    if (!playlist) return undefined;
    const res: any = await firstValueFrom(this.getMorceauPyliste(id));
    playlist.queue = res["morceauVMs"];
    return playlist;
  }
  getMorceauPyliste(id: number) {
    let options = { headers: this.headers, withCredentials: true };
    let data = {};
    //return this.http.get(  environment.serverBase+  'api/morceau/GetlistAudio', data);
    return this.http.get(
      environment.serverBase + "/GetMorceauPlaylist?id=" + id,
      data
    );
  }
  addPlaylist(playlist: playlistObj): void {
    this.playlists.push(playlist);
  }

  removePlaylist(id: number): void {
    this.playlists = this.playlists.filter((p) => p.id !== id);
  }

  updatePlaylistCount(id: number, count: number): void {
    const playlist = this.playlists.find((p) => p.id === id);
    if (playlist) {
      playlist.count = count;
    }
  }
}
