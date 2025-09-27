// src/app/services/vendor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vendor {
  vendorId: number;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  gstin?: string;
}

@Injectable({ providedIn: 'root' })
export class VendorService {
  private apiUrl = 'https://localhost:7242/api/vendors'; // adjust if needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`);
  }

  create(model: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, model);
  }

  update(id: number, model: Vendor): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
