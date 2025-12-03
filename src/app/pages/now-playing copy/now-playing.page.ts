import { Component, computed, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { MusicService } from "../../services/music.service";
import { IconPlayComponent } from "../../components/icons/icon-play.component";
import { IconPauseComponent } from "../../components/icons/icon-pause.component";
import { IconHeartComponent } from "../../components/icons/icon-heart.component";
import {
  IconNextComponent,
  IconPreviousComponent,
  IconShuffleComponent,
  IconRepeatComponent,
  IconMoreVerticalComponent,
} from "../../components/icons/icons.components";

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
  templateUrl: "./now-playing.page.html",
  styleUrls: ["./now-playing.page.scss"],
})
export class NowPlayingPage1 implements OnInit, OnDestroy {
  currentTrack = this.musicService.currentTrack;
  isPlaying = this.musicService.isPlaying;
  currentTime = this.musicService.currentTime;

  isFavorite = computed(() => {
    const track = this.currentTrack();
    //return track ? this.musicService.isFavorite(track.id) : false;
    return false;
  });

  progress = computed(() => {
    const track = this.currentTrack();
    const time = this.currentTime();
    if (!track) return 0;
    return 0;
    //return (time / track.duration) * 100;
  });

  private interval?: number;

  constructor(private musicService: MusicService, private router: Router) {}

  ngOnInit() {
    this.interval = window.setInterval(() => {
      if (this.isPlaying()) {
        const current = this.currentTime();
        const track = this.currentTrack();
        /*if (track && current < track.duration) {
          this.musicService.currentTime.set(current + 1);
        }*/
      }
    }, 1000);
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
    const track = this.currentTrack();
    if (track) {
      //this.musicService.toggleFavorite(track.id);
    }
  }

  formatTime(seconds: number): string {
    return this.musicService.formatDuration(seconds);
  }

  close(): void {
    this.router.navigate(["/tabs/home"]);
  }
}
