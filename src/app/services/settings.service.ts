import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private apiUrl = 'https://localhost:7242/api/settings';

  constructor(private http: HttpClient) {}
  getSocietyName() {
    return this.http.get<{ name: string }>(`${this.apiUrl}/society-name`);
  }
}