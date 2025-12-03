import { Injectable } from "@angular/core";
import { Track, TrackInfo } from "../interfaces/app.interfaces";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class TrackService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  HistorieVMplaylist: Track[] = [];
  Historieplaylist: Track[] = [];

  constructor(private http: HttpClient) {}

  setHistorieVMplaylist(tracks: Track[]): void {
    this.HistorieVMplaylist = tracks;
  }

  setHistorieplaylist(tracks: Track[]): void {
    this.Historieplaylist = tracks;
  }

  getRecentTracks(limit: number = 6): Track[] {
    return this.Historieplaylist.slice(0, limit);
  }

  addToHistory(track: Track): void {
    const exists = this.Historieplaylist.find((t) => t.id === track.id);
    if (!exists) {
      this.Historieplaylist.unshift(track);
    }
  }

  toggleFavorite(trackId: number): void {
    const track = this.Historieplaylist.find((t) => t.id === trackId);
    if (track) {
      track.isInFavorie = !track.isInFavorie;
    }
  }
  getTrackInfo(track: Track): TrackInfo | null {
    try {
      return JSON.parse(track.info);
    } catch {
      return null;
    }
  }
  extractImageUrl(info: string): string {
    var infojson = JSON.parse(info);
    if ("img" in infojson) {
      return infojson.img;
    } else {
      return "https://addplaybuttontoimage.way4info.net/Images/Icons/9.png";
    }
  }
  extractdurationString(info: string | any): string {
    if ((info ?? "") === "") {
      return "00:00";
    }
    var infojson = JSON.parse(info);
    if (infojson.duration) {
      let duration = infojson.duration;
      if (duration.startsWith("00:")) {
        duration = duration.substring(3);
      }
      return duration;
    }

    return "00:00";
  }
  extractduration(info: string): number {
    if ((info ?? "") === "") {
      return 0;
    }
    var infojson = JSON.parse(info);
    if ("duration" in infojson && infojson.duration != null) {
      const [hours, minutes, seconds] = infojson.duration
        .split(":")
        .map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    } else {
      return 0;
    }
  }
}
