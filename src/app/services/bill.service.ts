// src/app/services/bill.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bill {
  billId: number;
  memberId: number;
  periodStart?: string;
  periodEnd?: string;
  dueDate?: string;
  amount?: number;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class BillService {
  private apiUrl = 'https://localhost:7242/api/bills';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.apiUrl);
  }

  getById(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${id}`);
  }

  create(model: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, model);
  }

  update(id: number, model: Bill): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
