import { Injectable } from '@angular/core';
import { Setting } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private _setting: Setting = {
    playOne: false,
    saveCloud: true,
    playInLoop: false,
    maxPlayEnable: false,
    stopTimeEnable: false,
    maxPlay: 0,
    stopTime: 0
  };

  constructor() {}

  saveSetting(setting: Setting): void {
    this._setting = setting;
  }

  getSetting(): Setting {
    return this._setting;
  }

  updateSetting(updates: Partial<Setting>): void {
    this._setting = { ...this._setting, ...updates };
  }
}
