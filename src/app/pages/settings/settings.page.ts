import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title class="page-title">Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="settings-content fade-in">
        <div class="section">
          <div class="section-title">Account</div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">View Profile</div>
            </div>
            <ion-icon name="chevron-forward"></ion-icon>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Edit Profile</div>
            </div>
            <ion-icon name="chevron-forward"></ion-icon>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Playback</div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Crossfade</div>
              <div class="setting-description">
                Seamless transitions between songs
              </div>
            </div>
            <ion-toggle></ion-toggle>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Gapless</div>
              <div class="setting-description">
                Uninterrupted album playback
              </div>
            </div>
            <ion-toggle [checked]="true"></ion-toggle>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Audio Normalization</div>
              <div class="setting-description">
                Set the same volume level for all songs
              </div>
            </div>
            <ion-toggle [checked]="true"></ion-toggle>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Audio Quality</div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Streaming Quality</div>
              <div class="setting-description">High</div>
            </div>
            <ion-icon name="chevron-forward"></ion-icon>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Download Quality</div>
              <div class="setting-description">Very High</div>
            </div>
            <ion-icon name="chevron-forward"></ion-icon>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Storage</div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Downloads</div>
              <div class="setting-description">0 MB used</div>
            </div>
            <ion-icon name="chevron-forward"></ion-icon>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Clear Cache</div>
            </div>
            <ion-icon name="chevron-forward"></ion-icon>
          </div>
        </div>

        <div class="section">
          <div class="section-title">About</div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Version</div>
              <div class="setting-description">1.0.0</div>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Terms and Conditions</div>
            </div>
            <ion-icon name="chevron-forward"></ion-icon>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Privacy Policy</div>
            </div>
            <ion-icon name="chevron-forward"></ion-icon>
          </div>
        </div>

        <div class="section">
          <button class="logout-button">Log Out</button>
        </div>

        <div class="spacer"></div>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .page-title {
        font-size: 24px;
        font-weight: 700;
        padding: 0 16px;
      }

      .settings-content {
        padding: 16px 0;
      }

      .section {
        margin-bottom: 32px;
        padding: 0 16px;
      }

      .section-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--spotify-text-secondary);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 16px;
      }

      .setting-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        border-bottom: 1px solid var(--spotify-gray-light);
        cursor: pointer;
        transition: opacity 0.2s ease;

        &:last-child {
          border-bottom: none;
        }

        &:active {
          opacity: 0.7;
        }

        ion-icon {
          color: var(--spotify-text-secondary);
          font-size: 20px;
        }
      }

      .setting-info {
        flex: 1;
        min-width: 0;
      }

      .setting-label {
        font-size: 16px;
        font-weight: 500;
        color: var(--spotify-text);
        margin-bottom: 4px;
      }

      .setting-description {
        font-size: 13px;
        color: var(--spotify-text-secondary);
      }

      ion-toggle {
        --background: var(--spotify-gray-lighter);
        --background-checked: var(--spotify-green);
        --handle-background: var(--spotify-text);
        --handle-background-checked: var(--spotify-text);
      }

      .logout-button {
        width: 100%;
        padding: 16px;
        background: transparent;
        border: 2px solid var(--spotify-text);
        border-radius: 24px;
        color: var(--spotify-text);
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:active {
          transform: scale(0.98);
          opacity: 0.8;
        }
      }

      .spacer {
        height: 80px;
      }
    `,
  ],
})
export class SettingsPage {}
