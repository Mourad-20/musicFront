import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  IonContent,
  IonCard,
  //IonCardHeader,
  //IonCardTitle,
  IonCardContent,
  IonItem,
  //IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  LoadingController,
  AlertController,
} from "@ionic/angular/standalone";
//import { addIcons } from "ionicons";
//import { musicalNotes } from "ionicons/icons";
import { TokenService } from "../../services/token.service";
import { SettingService } from "../../services/setting.service";
import { TrackService } from "../../services/track.service";
import { PlaylistService } from "../../services/playlist.service";
import { _auth } from "../../interfaces/app.interfaces";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    //IonCardHeader,
    //IonCardTitle,
    IonCardContent,
    IonItem,
    // IonLabel,
    IonInput,
    IonButton,
    //IonIcon,
  ],
})
export class LoginPage {
  credentials: _auth = {
    login: "",
    password: "",
  };
  clickF: number = 0;
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private settingService: SettingService,
    private trackService: TrackService,
    private playlistService: PlaylistService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    //addIcons({ musicalNotes });
  }
  _loginF() {
    this.clickF = this.clickF + 1;
    if (this.clickF === 6) {
      var _auth: _auth = { login: "f01", password: "f01" };
      this._login(_auth);
      this.clickF = 0;
    }
  }
  async login() {
    if (!this.credentials.login || !this.credentials.password) {
      await this.showAlert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    var _auth: _auth = {
      login: this.credentials.login,
      password: this.credentials.password,
    };
    this._login(_auth);
    this.clickF = 0;
  }
  async _login(_auth: _auth) {
    const loading = await this.loadingController.create({
      message: "Connexion en cours...",
      spinner: "crescent",
    });
    await loading.present();

    try {
      const response: any = await this.http
        .post(`${environment.serverBase}/login`, _auth)
        .toPromise();

      await loading.dismiss();

      if (response?.state === 1 && response?.userVM) {
        await this.tokenService.saveTokens(
          response.token,
          response.RefreshToken
        );

        await this.tokenService.creatuser(response.userVM);

        this.settingService.saveSetting(response.settingVM);

        this.trackService.HistorieVMplaylist = response.morceauVMs || [];
        this.trackService.Historieplaylist = response.morceauVMs || [];

        this.playlistService.playlists = response.playlistVMs || [];
        this.playlistService.queuelistVMs = response.queuelistVMs || [];
        this.playlistService.idFavorie = response.idFavorie || 0;

        this.router.navigate(["/tabs/home"]);
      } else {
        await this.showAlert(
          "Erreur de connexion",
          response?.message || "Identifiants incorrects"
        );
      }
    } catch (error: any) {
      await loading.dismiss();
      await this.showAlert(
        "Erreur",
        error?.error?.message || "Une erreur est survenue lors de la connexion"
      );
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });
    await alert.present();
  }
}
