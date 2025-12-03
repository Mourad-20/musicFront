import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/app.interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async saveTokens(token: string, refreshToken: string): Promise<void> {
    await this._storage?.set('access_token', token);
    await this._storage?.set('refresh_token', refreshToken);
  }

  async getAccessToken(): Promise<string | null> {
    return await this._storage?.get('access_token');
  }

  async getRefreshToken(): Promise<string | null> {
    return await this._storage?.get('refresh_token');
  }

  async clearTokens(): Promise<void> {
    await this._storage?.remove('access_token');
    await this._storage?.remove('refresh_token');
    await this._storage?.remove('user');
  }

  async creatuser(_user: User): Promise<void> {
    await this._storage?.set('user', _user);
  }

  async getUser(): Promise<User | null> {
    return await this._storage?.get('user');
  }

  async refreshAccessToken(): Promise<string> {
    const refreshToken = await this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response: any = await firstValueFrom(
      this.http.post(`${environment.serverBase}/refreshToken`, {
        refreshToken
      })
    );

    if (response?.token) {
      await this.saveTokens(response.token, refreshToken);
      return response.token;
    }

    throw new Error('Failed to refresh token');
  }
}
