import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { firstValueFrom } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "../../environments/environment";
//import { Track, Playlist, Artist } from "../models/track.model";
import {
  PlayerState,
  Track,
  playlistObj,
  TrackInfo,
} from "../interfaces/app.interfaces";

@Injectable({
  providedIn: "root",
})
export class MusicService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  currentTrack = signal<Track | null>(null);
  PlaylistSelected = signal<playlistObj | null>(null);
  isPlaying = signal<boolean>(false);
  currentTime = signal<number>(0);
  favorites = signal<Set<string>>(new Set());
  private audio: HTMLAudioElement;
  private playerState = new BehaviorSubject<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playlist: [],
    playlistSugg: [],
    currentIndex: -1,
    isLoading: false,
  });

  public playerState$: Observable<PlayerState> =
    this.playerState.asObservable();
  constructor(private http: HttpClient) {
    this.audio = new Audio();
    this.setupAudioListeners();
  }
  private setupAudioListeners() {
    this.audio.addEventListener("timeupdate", () => {
      this.updateState({ currentTime: this.audio.currentTime });
    });

    this.audio.addEventListener("durationchange", () => {
      this.updateState({ duration: this.audio.duration });
    });

    this.audio.addEventListener("ended", () => {
      this.next();
    });

    this.audio.addEventListener("play", () => {
      this.updateState({ isPlaying: true });
    });

    this.audio.addEventListener("pause", () => {
      this.updateState({ isPlaying: false });
    });
  }
  private updateState(partial: Partial<PlayerState>) {
    this.playerState.next({ ...this.playerState.value, ...partial });
  }
  setPlaylistSugg(listMorceu: Track[]) {
    this.updateState({ playlistSugg: listMorceu });
  }
  setPlaylistQeue(listMorceu: Track[]) {
    this.updateState({ playlist: listMorceu });
  }
  next() {
    const { playlist, playlistSugg } = this.playerState.value;
    var next = this.getnext(
      playlist !== null && playlist.length > 0 ? playlist : playlistSugg
    );
    this.loadTrack(next);
  }
  getnext(list: Track[]) {
    const { currentTrack } = this.playerState.value;
    var index = list.findIndex((track) => track.url === currentTrack?.url);
    //index=index !== -1 ? index : 0;
    const lastIndex = list.length - 1;
    return index !== lastIndex
      ? currentTrack?.url || "" != list[index + 1].url
        ? list[index + 1]
        : list[index + 1 !== lastIndex ? index + 2 : index + 1]
      : list[0];
  }
  seek(time: number) {
    this.audio.currentTime = time;
  }
  previous() {
    const { playlist, currentIndex } = this.playerState.value;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      this.loadTrack(playlist[prevIndex]);
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
  async loadTrack(track: Track) {
    var sugg = await this.getSugg(track);
    this.updateState({
      isLoading: true,
      currentTrack: track,
      playlistSugg: sugg,
      duration: 0,
      currentTime: 0,
    });

    const videoId = this.extractVideoId(track.url);
    const apiUrl = `${environment.serverBase}/GetMorceau?input=${videoId}&fromsource=false`;

    try {
      debugger;
      const response: string =
        (await this.http.get(apiUrl, { responseType: "text" }).toPromise()) ??
        "";
      const data = JSON.parse(response);
      this.audio.src = data.Url || "";
      this.updateState({ isLoading: false });
      this.play();
    } catch (error) {
      console.error("Error loading track:", error);
      this.updateState({ isLoading: false });
    }
  }
  private extractVideoId(url: string): string {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : "";
  }
  play() {
    debugger;
    if (this.audio.src) {
      this.audio.play().catch((err) => console.error("Play error:", err));
    }
  }

  pause() {
    this.audio.pause();
  }

  togglePlay() {
    this.isPlaying.update((playing) => !playing);
    if (this.playerState.value.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  getTracks(): Track[] {
    return [];
  }

  getPlaylists(): playlistObj[] {
    return [];
  }

  getArtists(): object[] {
    return [];
  }

  getTrackById(id: string): Track | undefined {
    return;
  }

  getPlaylistById1(id: number): Track[] | undefined {
    this.getMorceauPyliste(id).subscribe((res: any) => {
      var traks: Track[] = res["morceauVMs"];
      return traks;
      //this.start(this.listTrackPlylist?.[0], false, true);
      //this.pageService.queueTrack = res["morceauVMs"];
      //this.pageService.idplylist = item.id;
    });

    /*const playlist = this.mockPlaylists.find((p) => p.id === id);
    if (playlist) {
      return {
        ...playlist,
        tracks: this.mockTracks.slice(0, 8),
      };
    }*/
    return undefined;
  }
  async getPlaylistById(id: number): Promise<Track[]> {
    const res: any = await this.getMorceauPyliste(id).toPromise();
    return res["morceauVMs"];
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
  async playTrack(track: Track): Promise<void> {
    this.currentTrack.set(track);
    this.isPlaying.set(true);

    this.loadTrack(track);
  }
  async getSugg(track: Track): Promise<Track[]> {
    /*this.afterPlay(track).subscribe((res: any) => {
      this.loadingsug = false;
      this.playlistsug = res["morceauDMs"];
      this.listtoply = res["morceauDMs"];
      this.plysugKey = res["plysugKey"];
    });*/
    const res: any = await firstValueFrom(this.afterPlay(track));
    return res["morceauDMs"];
  }
  async GetsugPlay(text: string) {
    let data = {};
    var get = this.http.get(
      environment.serverBase + "/GetsugPlay?input=" + text + "&nextKey=",
      data
    );
    const res: any = await firstValueFrom(get);
    return res["morceauDMs"];
  }
  afterPlay(track: Track) {
    let options = { headers: this.headers, withCredentials: true };
    return this.http.post(environment.serverBase + "/afterPlay", track);
  }
  nextTrack(): void {
    const current = this.currentTrack();
    if (!current) return;

    //const currentIndex = this.mockTracks.findIndex((t) => t.id === current.id);
    //const nextIndex = (currentIndex + 1) % this.mockTracks.length;
    //this.playTrack(this.mockTracks[nextIndex]);
  }

  previousTrack(): void {
    const current = this.currentTrack();
    if (!current) return;

    //const currentIndex = this.mockTracks.findIndex((t) => t.id === current.id);
    //const prevIndex =
    // currentIndex === 0 ? this.mockTracks.length - 1 : currentIndex - 1;
    //this.playTrack(this.mockTracks[prevIndex]);
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
    // return this.mockTracks.filter((t) => favIds.has(t.id));
    return [];
  }

  formatDuration1(seconds: number): string {
    debugger;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
  formatTime(seconds: number): string {
    const date = new Date(0);
    date.setSeconds(seconds);

    // Si le temps est inférieur à une heure, renvoie le format MM:SS
    if (this.audio.duration < 3600) {
      return date.toISOString().substr(14, 5); // Extrait le format MM:SS
    }

    // Sinon, renvoie le format HH:MM:SS
    return date.toISOString().substr(11, 8); // Extrait le format HH:MM:SS
  }
  gethistory(pageNumber: number, pageSize: number) {
    return this.SearchMorceaux("", 0, pageNumber, pageSize);
    //let options = {	headers: this.headers,withCredentials: true	};
    //let data = {};
    //return this.http.get(  environment.serverBase+  'api/morceau/GetlistAudio', data);
    //return this.http.get(  environment.serverBase +'/GetHistory?pageNumber='+pageNumber+'&pageSize='+pageSize, data);
  }
  SearchMorceaux(
    input: string,
    idplylist: number,
    pageNumber: number,
    pageSize: number
  ) {
    let options = { headers: this.headers, withCredentials: true };
    let data = {};
    //return this.http.get(  environment.serverBase+  'api/morceau/GetlistAudio', data);
    return this.http.get(
      environment.serverBase +
        "/SearchMorceaux?input=" +
        input +
        "&idplylist=" +
        idplylist +
        "&pageNumber=" +
        pageNumber +
        "&pageSize=" +
        pageSize,
      data
    );
  }
}
