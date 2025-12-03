import {
  Component,
  computed,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { MusicService } from "../../services/music.service";
import { IconPlayComponent } from "../../components/icons/icon-play.component";
import { IconPauseComponent } from "../../components/icons/icon-pause.component";
import { IconHeartComponent } from "../../components/icons/icon-heart.component";
import { TrackService } from "../../services/track.service";
import { take, map, firstValueFrom } from "rxjs";
import Swiper from "swiper";
import { SwiperOptions } from "swiper/types";
import {
  IconNextComponent,
  IconPreviousComponent,
  IconShuffleComponent,
  IconRepeatComponent,
  IconMoreVerticalComponent,
} from "../../components/icons/icons.components";
import { Track } from "../../interfaces/app.interfaces";
import { register } from "swiper/element/bundle";

// Call register once at the top level of your app or component file
register();
@Component({
  selector: "app-now-playing",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IconPlayComponent,
    IconPauseComponent,
    IconHeartComponent,
    IconNextComponent,
    IconPreviousComponent,
    IconShuffleComponent,
    IconRepeatComponent,
    IconMoreVerticalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./now-playing.page.html",
  styleUrls: ["./now-playing.page.scss"],
})
export class NowPlayingPage implements OnInit, OnDestroy {
  @ViewChild("swiperContainerRef") swiperElRef!: ElementRef;
  currentTrack: Track | any;
  isPlaying = this.musicService.isPlaying;
  currentTime = this.musicService.currentTime;
  isShrunk = false;
  isLoadingMore = false;
  isFavorite = computed(() => {
    //const track = this.currentTrack;
    //return track ? this.musicService.isFavorite(track.id) : false;
    return false;
  });
  progress$ = this.musicService.playerState$.pipe(
    map((state) =>
      state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0
    )
  );

  private interval?: number;

  constructor(
    public musicService: MusicService,
    private trackService: TrackService,
    private router: Router
  ) {}
  onProgressClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    this.musicService.playerState$.pipe(take(1)).subscribe((state) => {
      const newTime = percentage * (state.duration || 0);
      this.musicService.seek(newTime);
    });
    //const newTime = percentage * (this.musicService.playerState$.duration || 0);
  }

  ngAfterViewInit() {
    const swiperEl: any = this.swiperElRef.nativeElement;

    Object.assign(swiperEl, {
      slidesPerView: 1,
      pagination: {
        clickable: true,
        el: ".swiper-pagination-top",
        type: "bullets",
      },
    });

    swiperEl.initialize();

    // 🔥 Ajouter ceci pour forcer la pagination à apparaître
  }

  async ngOnInit() {
    this.currentTrack = await firstValueFrom(
      this.musicService.playerState$.pipe(map((state) => state.currentTrack))
    );
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  togglePlay(): void {
    this.musicService.togglePlay();
  }

  next(): void {
    this.musicService.nextTrack();
    this.musicService.currentTime.set(0);
  }

  previous(): void {
    this.musicService.previousTrack();
    this.musicService.currentTime.set(0);
  }

  toggleFavorite(): void {
    const track = this.currentTrack;
    if (track) {
      //this.musicService.toggleFavorite(track.id);
    }
  }

  formatTime(seconds: number): string {
    return this.musicService.formatTime(seconds);
  }
  getimgUrl(info: string): string {
    return this.trackService.extractImageUrl(info);
  }
  close(): void {
    this.router.navigate(["/tabs/home"]);
  }
  async nextPage() {
    if (this.isLoadingMore) return; // يمنع double calls

    this.isLoadingMore = true;
    await new Promise((resolve) => setTimeout(resolve, 500));

    const playlistSugg = await firstValueFrom(
      this.musicService.playerState$.pipe(map((state) => state.playlistSugg))
    );
    if (playlistSugg.length > 0) {
      var morceau = await this.musicService.GetsugPlay(
        playlistSugg[playlistSugg.length - 1].morceauID
      );
      this.musicService.setPlaylistSugg([...playlistSugg, ...morceau]);
    }
    this.isLoadingMore = false;
  }
  onScroll(event: any) {
    const el = event.target;
    const bottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
    if (bottom && !this.isLoadingMore) {
      this.nextPage();
    }
  }
  async playTrack(track: Track, fromQue: boolean = false) {
    const current = await firstValueFrom(
      this.musicService.playerState$.pipe(map((state) => state.currentTrack))
    );
    if (current?.url == track.url) {
      this.musicService.togglePlay();
    } else {
      if (!fromQue) {
        this.musicService.setPlaylistQeue([]);
      }
      this.musicService.playTrack(track);
    }
  }
}
